import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { imgGenerator } from '../Constants/apiImageGenerator';

const PlacesCard = ({ place }) => {
    const [imageUrl, setImageUrl] = useState('/1.jpg');

    useEffect(() => {
        const fetchPlaceImage = async () => {
            const searchQuery = `${place?.place_name} ${place?.place_description}`;
            const imageUrl = await imgGenerator(searchQuery);
            setImageUrl(imageUrl || "/1.jpg");
        };

        if (place?.place_name) {
            fetchPlaceImage();
        }
    }, [place]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-2'>
            <Image
                src={imageUrl}
                alt={place?.place_name || 'place'}
                width={130}
                height={200}
                className='aspect-square rounded-2xl p-2 w-full h-[200px]'
            />
            <div className='p-2'>
                <h2 className="font-bold text-base md:text-lg">{place?.place_name}</h2>
                <p className='text-sm text-gray-600'>{place?.place_description}</p>
                <h2 className="text-orange-500 font-medium text-sm md:text-base mt-2">
                    <span className="text-black">Best Time To Visit: </span>{place?.best_time_to_visit}
                </h2>
            </div>
        </div>
    );
};

export default PlacesCard;
