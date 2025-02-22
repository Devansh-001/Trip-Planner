import React from 'react'
import Lottie from 'react-lottie'
import animation from "../../../public/animation.json"
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const HomePage = () => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    const router = useRouter();

    return (
        <div className='w-full flex flex-col items-center md:justify-center md:items-start md:flex-row h-full p-4'>

            <div className='w-[240px] md:w-[410px] md:flex md:items-start'>
                <Lottie options={defaultOptions} />
            </div>

            <div className='text-center md:text-left flex flex-col gap-5 md:px-20 md:w-[550px] md:mt-10'>
                <h1 className='text-4xl md:text-6xl font-bold text-[#2e3a59]'>Create Your Dream Trip in Minutes</h1>
                <p className='text-[#4b4b4b] font-medium mt-4'>Plan personalized itineraries with ease—discover destinations, activities, and accommodations that match your style and preferences!</p>
                <Button
                    type="button"
                    variant="contained"
                    color="success"
                    className=" md:text-base lg:text-lg rounded-lg bg-[#2d9cdb] hover:bg-[#1a7bb9] transition-all"
                    sx={{ fontWeight: 600 }}
                    onClick={() =>router.push("/create-trip")}
                >
                    Find Your Trip
                </Button>
            </div>
        </div>
    )
}

export default HomePage
