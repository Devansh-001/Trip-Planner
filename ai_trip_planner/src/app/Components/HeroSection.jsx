// "use client"

// import React, { useEffect, useState } from 'react'
// import { motion } from "framer-motion"
// import Image from 'next/image';

// const HeroSection = () => {

//     const imgSrc = ["/1.png", "/2.png", "/3.png"];
//     const headlines = [
//         {
//             title: "Explore Without Limits",
//             subtitle: "Plan Without Hassle",
//             description: "Unlock boundless opportunities to discover the world with ease and convenience."
//         },
//         {
//             title: "Your Next Adventure Starts Here",
//             subtitle: "Plan the Trip of a Lifetime",
//             description: "Embark on unforgettable journeys with seamless planning and adventure at your fingertips."
//         },
//         {
//             title: "Plan Your Adventure",
//             subtitle: "Explore the World",
//             description: "Craft the perfect journey and immerse yourself in new cultures and experiences."
//         }
//     ];

//     const [index, setIndex] = useState(1);
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);

//         // const intervalId = setInterval(() => {
//         //     setIndex((prev) => {
//         //         const nextIndex = prev + 1;
//         //         return nextIndex >= imgSrc.length ? 0 : nextIndex;
//         //     });
//         // }, 10000);

//         return () => clearInterval(intervalId);
//     }, []);

//     if (!mounted) {
//         return null;
//     }

//     return (
//         <div className='w-[100vw] md:w-[65vw] h-[89.5vh]'>
//             <motion.div
//                 key={index}
//                 className='w-full h-full relative'
//                 initial={{ x: "-200px" }}
//                 animate={{ x: "0px" }}
//                 exit={{ x: "-400px" }}
//                 transition={{duration:1,ease:"easeInOut"}}
//             >
//                 {/* <div className='absolute z-10 flex flex-col w-full h-full justify-center items-center'>

//                     <div className='w-full text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl 2xl:text-8xl text-white font-bold text-center flex flex-col gap-4 p-4'>
//                         <h1 className='text-orange-400'>{headlines[index].title}</h1>
//                         <h1>{headlines[index].subtitle}</h1>
//                     </div>

//                     <p className='p-20 text-sm sm:text-lg lg:text-xl xl:text-2xl 2xl:text-5xl text-center text-white font-semibold'>
//                         {headlines[index].description}
//                     </p>
//                 </div> */}

//                 <Image
//                     src={imgSrc[index]}
//                     alt="Random Image"
//                     priority
//                     width={400}
//                     height={500}
//                     className='w-full h-full object-fill md:rounded-e-3xl'
//                 />
//             </motion.div>

//         </div>
//     )
// }

// export default HeroSection


"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSwipeable } from "react-swipeable"; // Import swipeable hook

const HeroSection = () => {
    const imgSrc = ["/1.jpg", "/2.jpg", "/3.jpg"]; // Changed image type to jpg
    const headlines = [
        {
            title: "Explore Without Limits",
            subtitle: "Plan Without Hassle",
            description:
                "Unlock boundless opportunities to discover the world with ease and convenience.",
        },
        {
            title: "Your Next Adventure Starts Here",
            subtitle: "Plan the Trip of a Lifetime",
            description:
                "Embark on unforgettable journeys with seamless planning and adventure at your fingertips.",
        },
        {
            title: "Plan Your Adventure",
            subtitle: "Explore the World",
            description:
                "Craft the perfect journey and immerse yourself in new cultures and experiences.",
        },
    ];

    const [index, setIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Change the image index when swipe left or right
    const handlers = useSwipeable({
        onSwipedLeft: () => nextImage(),
        onSwipedRight: () => prevImage(),
    });

    const nextImage = () => {
        setIndex((prev) => (prev + 1) % imgSrc.length); // loop to first image when reaching the end
    };

    const prevImage = () => {
        setIndex((prev) => (prev - 1 + imgSrc.length) % imgSrc.length); // loop to last image when going back
    };

    if (!mounted) {
        return null;
    }

    return (
        <div
            className="w-[100vw] md:w-[65vw] h-[89.5vh] relative"
            {...handlers} // Attach swipe handlers
        >
            <motion.div
                key={index}
                className="w-full h-full relative"
                initial={{ x: "-200px" }}
                animate={{ x: "0px" }}
                exit={{ x: "-400px" }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <Image
                    src={imgSrc[index]}
                    alt="Image"
                    priority
                    width={400}
                    height={500}
                    className="w-full h-full object-cover md:rounded-e-3xl"
                />

                {/* Title and Description over the image */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center gap-4 text-white px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-400 mb-6">
                        {headlines[index].title}
                    </h1>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6">
                        {headlines[index].subtitle}
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl font-medium text-green-300">
                        {headlines[index].description}
                    </p>
                </div>

                {/* Buttons for switching images */}
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-between w-1/2">
                    <button
                        onClick={prevImage}
                        className="bg-orange-500 text-white px-4 py-1 w-1/4 rounded-full shadow-md hover:bg-orange-400"
                    >
                        Prev
                    </button>
                    <button
                        onClick={nextImage}
                        className="bg-orange-500 text-white px-4 py-1 w-1/4 rounded-full shadow-md hover:bg-orange-400"
                    >
                        Next
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
