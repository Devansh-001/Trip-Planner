"use client"

import React, { useEffect, useState } from 'react'
import PlaceAutoComplete from './PlaceAutoComplete'
import { Button } from '@mui/material'
import InputField from './InputField'
import { propmt, selectBudgetOptions, selectTravelGroups } from '../Constants/options'
import Option from './Option'
import { useDispatch, useSelector } from 'react-redux'
import { setAlert } from '../Redux/appSlice'
import { chatSession } from '../AIPrompt/AiModel'
import { doc, setDoc } from 'firebase/firestore'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from '../../../firebase.config'
import { useRouter } from 'next/navigation'
import animation from "../../../public/Animation-2.json"
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Lottie = dynamic(() => import('react-lottie'), { ssr: false });


const CreateTrip = () => {

    const { user } = useSelector(store => store.appSlice);
    const dispatch = useDispatch();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    const options = {
        loop: false,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }

    const [currentFormData, setCurrentFormData] = useState({
        selectedBudget: -1,
        selectedTraveler: -1,
        numOfDays: "",
        query: ""
    })

    const [loading, setLoading] = useState(false);

    const saveTripDetails = async (data) => {
        setLoading(true);
        const docId = Date.now().toString();
        const collectionRef = doc(db, "Trips", docId);
        try {
            await setDoc(collectionRef, {
                userSelection: { ...currentFormData, selectedBudget: selectBudgetOptions[currentFormData.selectedBudget - 1].title, selectedTraveler: selectTravelGroups[currentFormData.selectedTraveler - 1].title },
                tripData: JSON.parse(data),
                userEmail: user?.email,
                id: docId,
            });
            setLoading(false);

            dispatch(setAlert({
                openSnackbar: true,
                msg: "Trip generated successfully!",
                type: "success"
            }));

            router.push(`trip-page/${docId}`)

        } catch (error) {
            setLoading(false);
            dispatch(setAlert({
                openSnackbar: true,
                msg: "Error saving trip details: " + error.message,
                type: "error"
            }));
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!currentFormData.query || currentFormData.selectedBudget === -1 || currentFormData.selectedTraveler === -1) {
            dispatch(setAlert({
                openSnackbar: true,
                msg: "Please fill all the fields.",
                type: "error"
            }));
            return;
        }

        if (currentFormData.numOfDays > 7) {
            dispatch(setAlert({
                openSnackbar: true,
                msg: "Number of days cannot be greater than 7.",
                type: "error"
            }));
            return;
        }

        setLoading(true);

        const finalPrompt = propmt
            .replace(/{numOfDays}/g, currentFormData.numOfDays)
            .replace(/{travelerType}/g, selectTravelGroups[currentFormData.selectedTraveler - 1].title)
            .replace(/{numOfPeople}/g, selectTravelGroups[currentFormData.selectedTraveler - 1].people)
            .replace(/{location}/g, currentFormData.query)
            .replace(/{budgetType}/g, selectBudgetOptions[currentFormData.selectedBudget - 1].title);

        try {
            const result = await chatSession.sendMessage(finalPrompt);
            saveTripDetails(result.response.text());

            dispatch(setAlert({
                openSnackbar: true,
                msg: "Trip generated successfully!",
                type: "success"
            }));

        } catch (error) {
            dispatch(setAlert({
                openSnackbar: true,
                msg: "Error during trip creation: " + error.message,
                type: "error"
            }));
        }

        setCurrentFormData({
            selectedBudget: -1,
            selectedTraveler: -1,
            numOfDays: "",
            query: ""
        })
        setLoading(false);
    }


    return (
        <motion.div
            className='flex flex-col p-5 gap-2 w-[100vw] md:w-[90vw] lg:w-[80vw]'
            initial={{ x: '-300px', opacity: 0, scale: 0.3 }}
            animate={{ x: '0px', opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
        >

            <div className='flex flex-col gap-5 p-4 md:p-5 mt-'>
                <h2 className='text-3xl font-bold'>Tell us about your travel style 🏞️✈️</h2>
                <p className='text-lg text-gray-600'>
                    Tell us your travel preferences, and we’ll craft a customized trip just for you!
                    From destination to budget, we’ll take care of the details.
                </p>
            </div>

            <form className='flex flex-col gap-10 p-4 md:p-5' onSubmit={handleSubmit}>
                {isClient &&
                    <div className='place-self-start bg-blue-200 rounded-xl w-[80px]'>
                        <Lottie options={options} />
                    </div>
                }

                <div className='flex flex-col gap-4'>
                    <h2 className='text-xl font-bold'>Where are you headed?</h2>
                    <PlaceAutoComplete curData={currentFormData} setCurData={setCurrentFormData} />
                </div>

                <div className='flex flex-col gap-4'>
                    <h2 className='text-xl font-bold'>How long are you looking to travel?</h2>
                    <InputField
                        type={"Number"}
                        required
                        min={0}
                        placeholder={"Number of days?"}
                        value={currentFormData.numOfDays}
                        onChange={(e) => {
                            setCurrentFormData({ ...currentFormData, numOfDays: e.target.value })
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                                e.preventDefault();
                            }
                        }}
                    />
                </div>

                <div className='flex flex-col gap-4'>
                    <h2 className='text-xl font-bold'>How much are you willing to spend?</h2>
                    <div className='flex gap-4 flex-wrap py-5 justify-normal'>
                        {
                            selectBudgetOptions.map((budget) => (
                                <Option
                                    onClick={() => {
                                        setCurrentFormData({ ...currentFormData, selectedBudget: budget.id });
                                    }}
                                    className={`${currentFormData.selectedBudget === budget.id ? "border-2 border-black" : ""} `}
                                    key={budget.id}
                                    icon={budget.icon}
                                    title={budget.title}
                                    desc={budget.desc}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <h2 className='text-xl font-bold'>Who will be joining you on your journey?</h2>

                    <div className='flex gap-4 flex-wrap justify-normal py-5'>
                        {
                            selectTravelGroups.map((traveler) => (
                                <Option
                                    onClick={() => {
                                        setCurrentFormData({ ...currentFormData, selectedTraveler: traveler.id });
                                    }}
                                    className={`${currentFormData.selectedTraveler === traveler.id ? "border-2 border-black" : ""}`}
                                    key={traveler.id}
                                    icon={traveler.icon}
                                    title={traveler.title}
                                    desc={traveler.desc}
                                />
                            ))
                        }
                    </div>
                </div>

                <Button
                    type='submit'
                    style={{ background: "black", color: "white", padding: 4, fontWeight: 600, fontSize: "18px" }}
                >
                    {loading ? <div className='flex items-center justify-center gap-4'>Generating Your Trip  <AiOutlineLoading3Quarters size={20} className='animate-spin ' /></div> : "Design My Trip"}
                </Button>s
            </form>
        </motion.div>
    )
}

export default CreateTrip
