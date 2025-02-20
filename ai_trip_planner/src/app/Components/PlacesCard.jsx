// import Image from 'next/image'
// import React from 'react'

// const PlacesCard = ({ place }) => {
//     return (
//         <div className='grid grid-cols-1 md:grid-cols-2 p-2'>

//             <Image src={"/1.jpg"} alt='place' width={130} height={200} className=' aspect-square w-fit h-full rounded-2xl p-2' />

//             <div className='p-2'>
//                 <h2 className="font-bold text-base md:text-lg">{place?.place_name}</h2>
//                 <p className='text-sm text-gray-600'>{place?.place_description}</p>

//                 <h2 className="text-orange-500 font-medium text-sm md:text-base mt-2"><span className="text-black">Best Time To Visit : </span>{place?.best_time_to_visit}</h2>
//             </div>

//         </div>
//     )
// }

// export default PlacesCard


import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const PlacesCard = ({ place }) => {
    const [imageUrl, setImageUrl] = useState('/1.jpg');

    useEffect(() => {
        const fetchPlaceImage = async () => {
            const searchQuery = `${place?.place_name} ${place?.place_description}`;
            const accessKey = '_KNMbs1bCeHc1__fymK7Ls8UaeF7oGb7T9gKskpUqVc'; // Replace with your Unsplash Access Key

            const response = await fetch(
                `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${accessKey}&per_page=1`
            );
            const data = await response.json();
            const imageUrl = data?.results?.[0]?.urls?.regular || "/1.jpg"; // Default image if no result
            setImageUrl(imageUrl);
        };

        if (place?.place_name) {
            fetchPlaceImage();
        }
    }, [place]);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 p-2'>
            <Image
                src={imageUrl} // Dynamic image source
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
