'use client';
import React from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { removeSelectedRoom } from '@/app/slice/bookingSlice';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';



export default function page() {

    const router = useRouter();

    let bookingData = useSelector((state) => state.booking.selectedRoom);



    let [hotelDetail, sethotelDetail] = useState([]);
    let [imagePath, setimagePath] = useState([]);

    let [userData, setuserData] = useState({});


    let [totalNights, settotalNights] = useState(0);
    let [totalAmount, settotalAmount] = useState(0);


    let hotel_id = bookingData?.hotel_id;


    let dispatch = useDispatch();


    const userToken = useSelector((state) => state.login.token);

    useEffect(() => {
        axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_WEBSITE_USER_PROFILE, {}, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            if (result.data._status == true) {
                setuserData(result.data._data);
            } else {
                console.log(result.data._message);
            }
        }).catch((error) => {
            console.log(error);

        })
    }, [userToken])







    useEffect(() => {
        if (hotel_id) {
            axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_WEBSITE_HOTEL_DETAIL, {
                hotel_id: hotel_id
            })
                .then((result) => {
                    if (result.data._status == true) {
                        sethotelDetail(result.data._data.hotel);
                        setimagePath(result.data._hotel_setting_image_path);
                    } else {
                        sethotelDetail();
                        setimagePath();
                    }
                }).catch((error) => {
                    console.log(error);
                })
        }
    }, [hotel_id]);



    //handle booking form submission
    let handlebookingSubmit = async (event) => {
    event.preventDefault();

    let formData = new FormData(event.target);

    let bookingPayload = {
        user_id: formData.get("customer_id"),
        room_id: bookingData?._id,

        check_in: formData.get("check_in"),
        check_out: formData.get("check_out"),

        guests: Number(formData.get("guests")),

        guest_name: formData.get("guest_name"),
        email: formData.get("email"),
        mobile_number: formData.get("mobile_number")
    };

    console.log("Booking Payload:", bookingPayload);

    try {

        let result = await axios.post(
            process.env.NEXT_PUBLIC_API_URL +
            process.env.NEXT_PUBLIC_WEBSITE_BOOKING_CREATE,
            bookingPayload
        );

        if (result.data._status === true) {

    console.log("Booking Response:", result.data);

    const bookingId = result.data._data._id;

    router.push(`/checkout?booking_id=${bookingId}`);

} else {

    console.log(result.data._message);

}

      
    } catch (error) {

        console.log("Booking Error:", error);

    }
};






    return (
        <>
            <Breadcrumb title="Booking" />

            <div className="container py-5">

                <h2 className="mb-4">Booking Details</h2>

                <div className="row">
                    <div className="col-lg-8">
                        <div className="card shadow-sm">

                            <div className="card-body">

                                <h4 className="mb-4">
                                    Complete Your Booking
                                </h4>

                                <form onSubmit={handlebookingSubmit}>

                                    <div className="row">

                                        {/* CHECK IN */}
                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Check-in Date *
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                name="check_in"
                                                required
                                            />

                                        </div>


                                        {/* CHECK OUT */}
                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Check-out Date *
                                            </label>

                                            <input
                                                type="date"
                                                className="form-control"
                                                name="check_out"
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* NUMBER OF GUESTS */}

                                    <div className="mb-4">

                                        <label className="form-label">
                                            Number of Guests *
                                        </label>

                                        <input
                                            type="number"
                                            className="form-control"
                                            name="guests"
                                            min="1"
                                            max={bookingData?.maxGuests}
                                            placeholder="Enter number of guests"
                                            required
                                        />

                                        <small className="text-muted">

                                            Maximum guests allowed:{" "}
                                            {bookingData?.maxGuests}

                                        </small>

                                    </div>


                                    <hr />


                                    <h5 className="mb-3">
                                        Guest Details
                                    </h5>


                                    {/* GUEST NAME */}

                                    <div className="mb-3">

                                        <label className="form-label">
                                            Full Name *
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            name="guest_name"
                                            placeholder="Enter your full name"
                                            defaultValue={userData?.name}
                                            required
                                        />

                                    </div>


                                    <div className="row">

                                        {/* EMAIL */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Email Address *
                                            </label>

                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                placeholder="Enter email"
                                                defaultValue={userData?.email}
                                                required
                                            />

                                        </div>


                                        {/* PHONE */}

                                        <div className="col-md-6 mb-3">

                                            <label className="form-label">
                                                Phone Number *
                                            </label>

                                            <input
                                                type="text"
                                                className="form-control"
                                                name="mobile_number"
                                                placeholder="Enter phone number"
                                                defaultValue={userData?.mobile_number}
                                                required
                                            />


                                            <input
                                                type="hidden"
                                                className="form-control"
                                                name="customer_id"
                                                defaultValue={userData?._id}
                                                required
                                            />

                                        </div>

                                    </div>


                                    {/* BUTTON */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary px-5"
                                    >
                                        Continue to Checkout
                                    </button>

                                </form>

                            </div>

                        </div>
                    </div>
                    <div className="col-lg-4">
                        {bookingData ? (
                            <div className="card shadow-sm">

                                <div className="card-body">


                                    <h4>
                                        Hotel Name: {hotelDetail.name}
                                    </h4>


                                    <p>
                                        {bookingData.name}
                                    </p>

                                    <p>
                                        Price: ₹{bookingData.price} per day
                                    </p>




                                    {totalNights > 0 && (
                                        <>
                                            <p>
                                                Total Nights: {totalNights}
                                            </p>

                                            <h5>
                                                Total Amount: ₹{totalAmount}
                                            </h5>
                                        </>
                                    )}

                                    <button className="btn btn-danger px-5" onClick={() => dispatch(removeSelectedRoom())}>
                                        Remove Booking
                                    </button>


                                </div>

                            </div>
                        ) : (
                            <div className="alert alert-warning">
                                No room selected.
                            </div>
                        )}

                    </div>
                </div>


            </div>
        </>
    )
}




