import SwiperSlideImgs from './SwiperSlideImgs';
import { motion } from "framer-motion"

const ImageCarousel = () => {
    return (
    <motion.div
        className="md:w-[60vw] w-full h-full"
        initial={{ x: "-300px", opacity: 0, scale: 0.5}}
        animate={{ x: "0px", opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeIn" }}
    >
        <SwiperSlideImgs />
    </motion.div>
    );
};

export default ImageCarousel;
