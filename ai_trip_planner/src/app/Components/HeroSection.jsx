import { useEffect, useState } from 'react';
import SwiperSlideImgs from './SwiperSlideImgs';
import { motion } from "framer-motion"

const ImageCarousel = () => {

    // const [isMobile, setIsMobile] = useState(null);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setIsMobile(window.innerWidth < 768);
    //     };
    //     handleResize();
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, []);

    // if (isMobile) {
    //     return <div><SwiperSlideImgs /></div>;
    // }

    return (
        <motion.div
            className="md:w-[65vw] w-full h-[89.5vh]"
            initial={{ x: "-300px", opacity: 0, scale: 0.5, rotate: -60 }}
            animate={{ x: "0px", opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <SwiperSlideImgs />
        </motion.div>
    );
};

export default ImageCarousel;
