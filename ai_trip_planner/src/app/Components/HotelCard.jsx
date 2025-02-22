import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { imgGenerator } from "../Constants/apiImageGenerator.js"

const HotelCard = ({ hotel }) => {
    const [imageUrl, setImageUrl] = useState('/1.jpg');

    useEffect(() => {
        const fetchHotelImage = async () => {
            const searchQuery = `${hotel?.hotel_name} ${hotel?.hotel_address}`;
            const imageUrl = await imgGenerator(searchQuery);
            setImageUrl(imageUrl || "/1.jpg");
        };

        if (hotel?.hotel_name && hotel?.hotel_address) {
            fetchHotelImage();
        }
    }, [hotel]);

    const hotelName = hotel?.hotel_name?.replace(/\bundefined\b/g, "") || "";
    const hotelAddress = hotel?.hotel_address?.replace(/\bundefined\b/g, "") || "";

    const href = `https://www.google.com/maps/search/?api=1&query=${hotelName}+${hotelAddress}`;

    return (
        <Link
            className='flex flex-col p-2 gap-6 w-[300px] hover:shadow-lg hover:scale-105 transition-all duration-500 rounded-xl cursor-pointer'
            href={href}
            target='_blank'
        >
            <Image
                src={imageUrl}
                width={300}
                height={200}
                alt={hotel?.hotel_name || 'hotel'}
                className='rounded-2xl place-self-center w-full h-[200px]'
            />

            <div className='px-2 place-self-start flex flex-col gap-2'>
                <h2 className='font-bold'>{hotel?.hotel_name}</h2>
                <h2 className='text-sm text-gray-500'>📍{hotel?.hotel_address}</h2>
                <h2 className='text-sm text-gray-500'>💰 {hotel?.currency_symbol} {hotel?.price_per_night} per night.</h2>
                <h2 className='text-sm text-gray-500'>⭐ {hotel?.hotel_rating} stars</h2>
            </div>
        </Link>
    );
};

export default HotelCard;
