import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

// HotelCard component
const HotelCard = ({ hotel }) => {
    const [imageUrl, setImageUrl] = useState('/1.jpg');

    useEffect(() => {
        const fetchHotelImage = async () => {
            const searchQuery = `${hotel?.hotel_name} ${hotel?.hotel_address}`;
            const accessKey = '_KNMbs1bCeHc1__fymK7Ls8UaeF7oGb7T9gKskpUqVc'; // Replace with your Unsplash Access Key
            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${accessKey}&per_page=1`
            );
            const data = await response.json();
            const imageUrl = data?.results?.[0]?.urls?.regular || "/1.jpg"; // Default image if no result
            setImageUrl(imageUrl);
        };

        if (hotel?.hotel_name && hotel?.hotel_address) {
            fetchHotelImage();
        }
    }, [hotel]);

    return (
        <Link
            className='flex flex-col p-2 gap-6 w-[300px] hover:shadow-lg hover:scale-105 transition-all duration-500 rounded-xl cursor-pointer'
            href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name}+${hotel?.hotel_address}`}
            target='_blank'
        >
            <Image
                src={imageUrl} // Use the dynamic image URL
                width={300}
                height={200}
                alt={hotel?.hotel_name || 'hotel'}
                className='rounded-2xl place-self-center w-full h-[200px]'
            />

            <div className='px-2 place-self-start flex flex-col gap-2'>
                <h2 className='font-bold'>{hotel?.hotel_name}</h2>
                <h2 className='text-sm text-gray-500'>📍{hotel?.hotel_address}</h2>
                <h2 className='text-sm text-gray-500'>💰 ${hotel?.price_per_night} per night.</h2>
                <h2 className='text-sm text-gray-500'>⭐ {hotel?.hotel_rating} stars</h2>
            </div>
        </Link>
    );
};

export default HotelCard;
