import Image from "next/image"
import { useEffect, useState } from "react"
import { imgGenerator } from "../Constants/apiImageGenerator";
import Link from "next/link";

const TripCard = ({ trip }) => {

    const [imgUrl, setImgUrl] = useState("/1.jpg");

    useEffect(() => {
        const fetchUnsplashImage = async () => {
            try {
                const searchQuery = `${trip?.userSelection?.query} big image`;
                const imageUrl = await imgGenerator(searchQuery);
                setImgUrl(imageUrl);
            } catch (error) {
                console.error('Error fetching image from Unsplash:', error);
                setImgUrl("/1.jpg");
            }
        };

        if (trip?.userSelection?.query) {
            fetchUnsplashImage();
        }

    }, [trip])


    return (
        <Link
            className='shadow-lg p-2 py-5 md:flex md:flex-col md:items-center md:gap-3 rounded-xl hover:scale-105 transition-all duration-500'
            href={"/trip-page/" + trip?.id}
        >
            <div>
                <Image src={imgUrl || "/1.jpg"} width={100} height={100} alt='trip image' quality={100} priority className='rounded-xl w-[120px] md:w-[300px] h-[200px] object-cover aspect-square' />

                <h2 className="font-bold text-lg mt-3">{trip?.userSelection?.query.substr(0, 24)}{trip?.userSelection?.query.length > 24 ? "..." : ""}</h2>
                <p className="font-medium text-base text-gray-600">{parseInt(trip?.userSelection?.numOfDays)} Days trip with {trip?.userSelection?.selectedBudget} Budget</p>
            </div>
        </Link>
    )
}

export default TripCard
