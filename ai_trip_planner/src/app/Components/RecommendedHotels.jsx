import Image from 'next/image'
import React from 'react'

const RecommendedHotels = ({ trip }) => {
    return (
        <div className='p-4 w-full flex flex-col gap-6'>
            <h2 className='font-bold text-2xl'>Hotels Recommendation</h2>

            <div className='flex flex-wrap justify-between'>
                {
                    trip?.tripData?.hotel_recommendations.map((hotel, index) => {
                        return (
                            <div key={index} className='flex flex-col p-2 gap-6 w-[300px] hover:shadow-lg hover:scale-105 transition-all duration-500 rounded-xl '>
                                <Image src={"/1.jpg"} width={250} height={400} alt='hotel' className='rounded-2xl place-self-center' />

                                <div className='px-2 place-self-start'>
                                    <h2 className='font-bold '>{hotel?.hotel_name}</h2>
                                    <h2 className='text-sm  text-gray-500'>📍{hotel?.hotel_address}</h2>
                                    <h2 className='text-sm  text-gray-500'>💰 ${hotel?.price_per_night} per night.</h2>
                                    <h2 className='text-sm  text-gray-500'>⭐ {hotel?.hotel_rating
                                    } stars</h2>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RecommendedHotels
