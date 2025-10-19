// import React from 'react'
'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from "next/image";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";

const HeroCarousel = () => {
    const heroarray = [
        { img: './assets/images/hero-1.svg', alt: 'watch' },
        { img: './assets/images/hero-2.svg', alt: 'Bag' },
        { img: './assets/images/hero-3.svg', alt: 'Lamp' },
        { img: './assets/images/hero-4.svg', alt: 'Air Fryer' },
        { img: './assets/images/hero-5.svg', alt: 'chair' },
    ]
    return (
        <div className="relative sm:px-10 py-5 sm:pt-20 pb-5 max-w-[560px] h-[700px] w-full bg-[#F2F4F7] rounded-[30px] sm:mx-auto">
            <Carousel
            showThumbs = {false}
            autoPlay
            infiniteLoop
            interval={2000}
            showArrows={false}
            showStatus={false}
            >
                {heroarray.map((hero) => (
                    <Image
                        src={hero.img}
                        alt={hero.alt}
                        key={hero.alt}
                        height={484}
                        width={484}
                    />
                ))}
            </Carousel>
        </div>
    )
}

export default HeroCarousel