import Image from 'next/image'
import React, { useRef } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import 'swiper/swiper-bundle.css';
import { EffectCube } from "swiper/modules"

const SwiperSlideImgs = ({ }) => {

    const swiperRef = useRef(null);

    const imgs = ["/1.png", "/2.png", "/3.png"];
    return (
        <>
            <Swiper
                ref={swiperRef}
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                grabCursor={true}
                effect="cube"
                modules={[EffectCube]}
                speed={1500}
                className='h-full'
            >

                {imgs.map((img, index) => {

                    return (

                        <SwiperSlide key={index}>
                            <Image src={img} alt="Image" priority quality={100} width={1000} height={700} className="w-full h-full rounded-e-3xl" />
                        </SwiperSlide>
                    )
                })}

                <div className="absolute z-40 bottom-5 left-1/2 transform -translate-x-1/2 flex justify-between w-1/2">
                    <button
                        onClick={() => swiperRef.current.swiper.slidePrev(1500)}
                        className="bg-orange-500 text-white px-4 py-1 w-1/4 rounded-full shadow-md hover:bg-orange-400"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => swiperRef.current.swiper.slideNext(1500)}
                        className="bg-orange-500 text-white px-4 py-1 w-1/4 rounded-full shadow-md hover:bg-orange-400"
                    >
                        Next
                    </button>
                </div>
            </Swiper>
        </>
    )
}

export default SwiperSlideImgs


