"use client"

import React, { useState } from 'react'
import PlaceAutoComplete from './PlaceAutoComplete'
import { Button } from '@mui/material'
import InputField from './InputField'
import { selectBudgetOptions, selectTravelGroups } from '../Constants/options'
import Option from './Option'
import { useDispatch, useSelector } from 'react-redux'
import { setFormData } from '../Redux/appSlice'

const CreateTrip = () => {

    const { formData } = useSelector(store => store.appSlice);

    const [currentFormData, setCurrentFormData] = useState({
        selectedBudget: -1,
        selectedTraveler: -1,
        numOfDays: "",
        query: ""
    })

    const dispatch = useDispatch();

    return (
        <div className='flex flex-col p-10 gap-10 w-[100vw] md:w-[90vw] lg:w-[80vw]'>

            <div className='flex flex-col gap-5 p-4 md:p-10 mt-10'>
                <h2 className='text-3xl font-bold'>Tell us about your travel style 🏞️✈️</h2>
                <p className='text-lg text-gray-600'>
                    Tell us your travel preferences, and we’ll craft a customized trip just for you!
                    From destination to budget, we’ll take care of the details.
                </p>
            </div>

            <div className='flex flex-col gap-10 p-4 md:p-10'>

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
                            dispatch(setFormData({ ...formData, numOfDays: e.target.value }));
                            setCurrentFormData({ ...currentFormData, numOfDays: e.target.value })
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
                                        dispatch(setFormData({ ...formData, budget: budget.title }));
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
                                        dispatch(setFormData({ ...formData, traveler: traveler.people }));
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
                    onClick={() => {
                        console.log(formData);
                        setCurrentFormData({
                            selectedBudget: -1,
                            selectedTraveler: -1,
                            numOfDays: "",
                            query: ""
                        })
                    }}
                    className='bg-black text-md font-bold p-4 text-white'>
                    Design My Trip
                </Button>
            </div>


        </div>
    )
}

export default CreateTrip
