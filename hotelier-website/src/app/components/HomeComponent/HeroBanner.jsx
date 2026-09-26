'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';

export default function HeroBanner() {
    const [sliderData, setSliderData] = useState([]);
   
    useEffect(() => {
        axios
            .post(
                process.env.NEXT_PUBLIC_API_URL +
                process.env.NEXT_PUBLIC_WEBSITE_SLIDER
            )
            .then((result) => {
                if (result.data._status === true) {
                    setSliderData(result.data._data);
                  
                } else {
                    setSliderData([]);
                   
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings}>
            {sliderData.map((item, index) => (
                <div key={index}>
                    <div className="carousel-item active">
                        <img
                            className="w-100"
                            src={`${item.image}`}
                            alt={item.slider_title}
                        />

                        <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                            <div className="p-3">
                                <h6 className="section-title text-white text-uppercase mb-3">
                                    {item.sub_heading}
                                </h6>

                                <h1 className="display-3 text-white mb-4">
                                    {item.heading}
                                </h1>

                                <a
                                    href={item.button1_link || '#'}
                                    className="btn-primary-btn py-md-3 px-md-5 me-3"
                                >
                                    {item.button1_text || 'Learn More'}
                                </a>

                                <a
                                    href={item.button2_link || '#'}
                                    className="btn-light-btn py-md-3 px-md-5"
                                >
                                    {item.button2_text || 'Book Now'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
}