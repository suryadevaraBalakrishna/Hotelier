'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';



export default function HotelSearch() {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);


    const router = useRouter();



    const searchLocation = async (value) => {

        setSearch(value);

        if (value.length < 2) {
            setSuggestions([]);
            return;
        }

        try {

            const response = await axios.post(
                "https://places.googleapis.com/v1/places:autocomplete",
                {
                    input: value
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_API_KEY
                    }
                }
            );

            setSuggestions(response.data.suggestions || []);

        } catch (error) {
            console.log(error);
        }

    }

    let handleSearch = (event) => {
        event.preventDefault();
        const location = event.target.location.value;

        router.push(`/hotel?location=${encodeURIComponent(location)}`);
    }


    const today = new Date();

    const checkIn = today.toISOString().split("T")[0];

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const checkOut = tomorrow.toISOString().split("T")[0];


    return (
        <div className="container-fluid booking pb-5 wow fadeIn" data-wow-delay="0.1s" style={{ "padding": "35px" }}>
            <div className="container">
                <div className="bg-white shadow" style={{ "padding": "25px" }}>
                    <form onSubmit={handleSearch}>
                        <div className="row g-2">
                            <h2>Search Hotels</h2>
                            <div className="col-md-10">
                                <div className="row g-2">
                                    <div className="col-md-5  position-relative">
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='location'
                                            placeholder="Search by city, hotel, or neighborhood"
                                            autoComplete="off"
                                            value={search}
                                            onChange={(e) => searchLocation(e.target.value)}
                                        />
                                        {suggestions.length > 0 && (

                                            <div className="list-group position-absolute w-100 shadow">

                                                {suggestions.map((item, index) => (

                                                    <button
                                                        type="button"
                                                        key={index}
                                                        className="list-group-item list-group-item-action"
                                                        onClick={() => {

                                                            setSearch(
                                                                item.placePrediction.text.text
                                                            );

                                                            setSuggestions([]);

                                                        }}
                                                    >

                                                        <strong>
                                                            {item.placePrediction.structuredFormat.mainText?.text}
                                                        </strong>

                                                        <br />

                                                        <small>

                                                            <small>
                                                                {item.placePrediction.structuredFormat.secondaryText?.text || ""}
                                                            </small>

                                                        </small>

                                                    </button>

                                                ))}

                                            </div>

                                        )}
                                    </div>
                                    <div className="col-md-2">
                                        <div className="date" id="date1" data-target-input="nearest">
                                            <input type="date" className="form-control datetimepicker-input" placeholder="Check in" defaultValue={checkIn} data-target="#date1" data-toggle="datetimepicker" />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="date" id="date2" data-target-input="nearest">
                                            <input type="date" className="form-control datetimepicker-input" placeholder="Check out" defaultValue={checkOut} data-target="#date2" data-toggle="datetimepicker" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <select className="form-select" defaultValue="">
                                            <option value="">Number of Guests</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-2">
                                <button className="btn-primary-btn py-1 box-shadow-none  w-100">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
