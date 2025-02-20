import Image from 'next/image'
import React from 'react'
import { selectBudgetOptions, selectTravelGroups } from '../Constants/options'
import { RiShareForwardFill } from "react-icons/ri";
import InfoTag from './InfoTag';

const InformationSection = ({ trip }) => {

    const selectedBudgetIndex = selectBudgetOptions.findIndex(option => option.title == trip?.userSelection?.selectedBudget)

    const selectedTravelerIndex = selectTravelGroups.findIndex(option => option.title == trip?.userSelection?.selectedTraveler)

    const tripData = {
        location: trip?.userSelection?.query,
        numOfDays: trip?.userSelection?.numOfDays,
        budgetType: selectBudgetOptions[selectedBudgetIndex]?.title,
        numOfTravelers: selectTravelGroups[selectedTravelerIndex]?.people
    }

    return (

        <div className='p-4 w-full flex gap-5 flex-col'>

            <Image src={"/1.jpg"} alt='image' width={1000} height={200} className='h-[300px] w-full rounded-2xl' />

            <div className=' flex flex-col gap-2 justify-center'>
                <h2 className='font-bold text-lg sm:text-xl md:text-2xl'>{tripData?.location}</h2>

                <div className='flex flex-row items-center gap-3 flex-wrap'>

                    <InfoTag
                        value={tripData?.numOfDays}
                        label={{ singular: 'Day', plural: 'Days' }}
                        condition={tripData?.numOfDays === 1}
                    />
                    <InfoTag
                        value={tripData?.budgetType}
                        icon={selectBudgetOptions[selectedBudgetIndex]?.icon}
                        label={{ singular: '', plural: 'Budget' }}
                    />
                    <InfoTag
                        value={tripData?.numOfTravelers}
                        icon={selectTravelGroups[selectedTravelerIndex]?.icon}
                        label={{ singular: '', plural: 'No. Of Traveler' }}
                    />

                    <button className='md:ml-auto text-white bg-black w-fit px-2 p-1 rounded-xl'><RiShareForwardFill size={23} /></button>
                </div>
            </div>
        </div >
    )
}

export default InformationSection
