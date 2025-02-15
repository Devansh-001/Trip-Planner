"use client"

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import Image from 'next/image';

const HeroSection = () => {

    const imgSrc = ["/1.jpg", "/2.jpg", "/3.jpg"];
    const headlines = [
        {
            title: "Explore Without Limits",
            subtitle: "Plan Without Hassle",
            description: "Unlock boundless opportunities to discover the world with ease and convenience."
        },
        {
            title: "Your Next Adventure Starts Here",
            subtitle: "Plan the Trip of a Lifetime",
            description: "Embark on unforgettable journeys with seamless planning and adventure at your fingertips."
        },
        {
            title: "Plan Your Adventure",
            subtitle: "Explore the World",
            description: "Craft the perfect journey and immerse yourself in new cultures and experiences."
        }
    ];

    const [index, setIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const intervalId = setInterval(() => {
            setIndex((prev) => {
                const nextIndex = prev + 1;
                return nextIndex >= imgSrc.length ? 0 : nextIndex;
            });
        }, 5000);

        return () => clearInterval(intervalId);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className='w-[100vw] md:w-[65vw] h-[60vh] md:h-screen relative'>

            <motion.div
                key={index}
                className='absolute w-full h-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
            >
                <div className='absolute z-10 flex flex-col w-full h-full justify-center items-center'>

                    <div className='w-full text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-8xl text-white font-bold text-center flex flex-col gap-4 p-4'>
                        <h1 className='text-orange-400'>{headlines[index].title}</h1>
                        <h1>{headlines[index].subtitle}</h1>
                    </div>

                    <p className='p-20 text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-5xl text-center text-white font-semibold'>
                        {headlines[index].description}
                    </p>
                </div>

                <Image
                    src={imgSrc[index]}
                    alt="Random Image"
                    priority
                    width={500}
                    height={500}
                    className='w-full h-full object-cover md:rounded-e-3xl'
                />
            </motion.div>

        </div>
    )
}

export default HeroSection