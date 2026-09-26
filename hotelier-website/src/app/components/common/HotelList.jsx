'use client';
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';

export default function HotelList({ limit }) {

    let [hotels, setHotels] = useState([])
    let [images, setImages] = useState([])

    const searchParams = useSearchParams();
    const search = searchParams.get('location');
    const city = search?.split(",")[0].trim();




    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_WEBSITE_HOTEL, {
            location: city
        })
            .then((result) => {
                if (result.data._status == true) {
                    let hotelData = result.data._data;

                    if (limit) {
                        hotelData = hotelData.slice(0, limit);
                    }
                    setHotels(hotelData);
                    setImages(result.data._hotel_setting_image_path);
                } else {
                    console.log(result.data._message)
                }
            }).catch((error) => {
                console.log(error)
            })
    }, [])



    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s" >
                    <h6 className="section-title text-center text-primary-text text-uppercase">Our Hotels</h6>
                    <h1 className="mb-5">Explore Our <span className="text-primary-text text-uppercase">Hotels</span></h1>
                </div>
                <div className="row g-4">
                    {hotels.map((hotel, index) => {
                        return (
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s" key={index}>
                                <div className="room-item shadow rounded overflow-hidden">
                                    <div className="position-relative">
                                        <img className="img-fluid" src={images + hotel.image} alt="" />
                                    </div>
                                    <div className="p-4 mt-2">
                                        <div className="d-flex justify-content-between mb-3">
                                            <h5 className="mb-0">{hotel.name}</h5>

                                        </div>

                                        <p className="text-body mb-3">{hotel.description}</p>
                                        <div className="d-flex justify-content-between">
                                            <Link className="btn btn-sm btn-primary rounded py-2 px-4" href={`/hotel/${hotel.slug}`}>View Detail</Link>
                                          
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }



                </div>
            </div>
        </div>

    )
}
