// import Image from 'next/image'
// import React from 'react'
// import { selectBudgetOptions, selectTravelGroups } from '../Constants/options'
// import { RiShareForwardFill } from "react-icons/ri";
// import InfoTag from './InfoTag';

// const InformationSection = ({ trip }) => {

//     const selectedBudgetIndex = selectBudgetOptions.findIndex(option => option.title == trip?.userSelection?.selectedBudget)

//     const selectedTravelerIndex = selectTravelGroups.findIndex(option => option.title == trip?.userSelection?.selectedTraveler)

//     const tripData = {
//         location: trip?.userSelection?.query,
//         numOfDays: trip?.userSelection?.numOfDays,
//         budgetType: selectBudgetOptions[selectedBudgetIndex]?.title,
//         numOfTravelers: selectTravelGroups[selectedTravelerIndex]?.people
//     }

//     return (

//         <div className='p-4 w-full flex gap-5 flex-col'>

//             <Image src={"/1.jpg"} alt='image' width={1000} height={200} className='h-[300px] w-full rounded-2xl' />

//             <div className=' flex flex-col gap-2 justify-center'>
//                 <h2 className='font-bold text-lg sm:text-xl md:text-2xl'>{tripData?.location}</h2>

//                 <div className='flex flex-row items-center gap-3 flex-wrap'>

//                     <InfoTag
//                         value={tripData?.numOfDays}
//                         label={{ singular: 'Day', plural: 'Days' }}
//                         condition={tripData?.numOfDays === 1}
//                     />
//                     <InfoTag
//                         value={tripData?.budgetType}
//                         icon={selectBudgetOptions[selectedBudgetIndex]?.icon}
//                         label={{ singular: '', plural: 'Budget' }}
//                     />
//                     <InfoTag
//                         value={tripData?.numOfTravelers}
//                         icon={selectTravelGroups[selectedTravelerIndex]?.icon}
//                         label={{ singular: '', plural: 'No. Of Traveler' }}
//                     />

//                     <button className='md:ml-auto text-white bg-black w-fit px-4 p-2 rounded-xl'><RiShareForwardFill size={23} /></button>
//                 </div>
//             </div>
//         </div >
//     )
// }

// export default InformationSection




import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { selectBudgetOptions, selectTravelGroups } from '../Constants/options'
import { RiShareForwardFill } from "react-icons/ri";
import InfoTag from './InfoTag';

const InformationSection = ({ trip }) => {
    const [unsplashImage, setUnsplashImage] = useState("/1.jpg"); // default image

    const selectedBudgetIndex = selectBudgetOptions.findIndex(option => option.title == trip?.userSelection?.selectedBudget)

    const selectedTravelerIndex = selectTravelGroups.findIndex(option => option.title == trip?.userSelection?.selectedTraveler)

    const tripData = {
        location: trip?.userSelection?.query,
        numOfDays: trip?.userSelection?.numOfDays,
        budgetType: selectBudgetOptions[selectedBudgetIndex]?.title,
        numOfTravelers: selectTravelGroups[selectedTravelerIndex]?.people
    }

    useEffect(() => {
        const fetchUnsplashImage = async () => {
            try {
                const accessKey = '_KNMbs1bCeHc1__fymK7Ls8UaeF7oGb7T9gKskpUqVc'; // Replace with your Unsplash Access Key
                const searchQuery = `${tripData?.location} travel`; // You can use the location or any other relevant detail for your query
                
                const response = await fetch(`https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${accessKey}&per_page=1`);
                const data = await response.json();
                
                if (data.results.length > 0) {
                    setUnsplashImage(data.results[0].urls.regular); // Set the image URL from Unsplash
                } else {
                    setUnsplashImage("/1.jpg"); // fallback image if no Unsplash result
                }
            } catch (error) {
                console.error('Error fetching image from Unsplash:', error);
                setUnsplashImage("/1.jpg"); // fallback image in case of error
            }
        };

        if (tripData?.location) {
            fetchUnsplashImage(); // Fetch image when the location is available
        }
    }, [tripData?.location]); // Dependency array ensures the effect runs only when location changes

    return (
        <div className='p-4 w-full flex gap-5 flex-col'>
            <Image
                src={unsplashImage} // Dynamic image URL
                alt='Trip Image'
                width={1000}
                height={200}
                className='h-[300px] w-full rounded-2xl'
            />

            <div className='flex flex-col gap-2 justify-center'>
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

                    <button className='md:ml-auto text-white bg-black w-fit px-4 p-2 rounded-xl'>
                        <RiShareForwardFill size={23} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default InformationSection;
