'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRazorpay } from "react-razorpay";
import { useSelector, useDispatch } from "react-redux";
import { removeSelectedRoom } from '@/app/slice/bookingSlice';


function CheckoutPage() {

    const searchParams = useSearchParams();

    const booking_id = searchParams.get('booking_id');

    const [bookingData, setBookingData] = useState(null);

    const { Razorpay } = useRazorpay();

    const userToken = useSelector((state) => state.login.token);

    const dispatch = useDispatch();


    useEffect(() => {

        if (!booking_id) {
            return;
        }

        axios.post(
            process.env.NEXT_PUBLIC_API_URL +
            process.env.NEXT_PUBLIC_WEBSITE_BOOKING_DETAILS,
            {
                booking_id: booking_id
            }
        )
            .then((result) => {

                if (result.data._status === true) {

                    setBookingData(result.data._data);

                } else {

                    console.log(result.data._message);

                }

            })
            .catch((error) => {

                console.log(error);

            });

    }, [booking_id]);


    const createPaymentOrder = async () => {

        if (!booking_id) {

            alert("Booking ID not found");

            return;
        }

        try {

            const result = await axios.post(
                process.env.NEXT_PUBLIC_API_URL +
                process.env.NEXT_PUBLIC_WEBSITE_BOOKING_PAYMENT,
                {
                    booking_id: booking_id
                },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );

            console.log("Payment Response:", result.data);


            if (result.data._status === true) {

                const orderInfo = result.data.orderInfo;

                console.log("Razorpay Order:", orderInfo);


                const options = {

                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

                    amount: orderInfo.amount,

                    currency: orderInfo.currency,

                    name: "Hotelier",

                    description: "Hotel Room Booking",

                    order_id: orderInfo.id,


                    handler: async function (response) {

                        console.log("Payment Success:", response);

                        try {

                            const verifyResult = await axios.post(
                                process.env.NEXT_PUBLIC_API_URL +
                                process.env.NEXT_PUBLIC_WEBSITE_BOOKING_VERIFY_PAYMENT,
                                {
                                    booking_id: booking_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_signature: response.razorpay_signature
                                }
                            );


                            console.log(
                                "Payment Verification:",
                                verifyResult.data
                            );


                            if (verifyResult.data._status === true) {

                                dispatch(removeSelectedRoom());

                                alert(
                                    "Payment Successful! Booking Confirmed."
                                );

                                console.log(
                                    "Booking Status:",
                                    verifyResult.data._data.status
                                );

                            } else {

                                alert(
                                    verifyResult.data._message
                                );

                            }

                        } catch (error) {

                            console.log(
                                "Payment Verification Error:",
                                error
                            );

                            alert(
                                "Payment verification failed."
                            );

                        }

                    },


                    prefill: {

                        name: bookingData.guest_name,

                        email: bookingData.email,

                        contact: bookingData.mobile_number

                    },


                    theme: {

                        color: "#0d6efd"

                    }

                };


                const razorpayInstance = new Razorpay(options);


                razorpayInstance.on(
                    "payment.failed",
                    function (response) {

                        console.log(
                            "Payment Failed:",
                            response
                        );

                        alert("Payment Failed!");

                    }
                );


                razorpayInstance.open();


            } else {

                alert(result.data._message);

            }


        } catch (error) {

            console.log("Payment Error:", error);

            alert("Something went wrong");

        }

    };


    return (

        <>

            <Breadcrumb title="Checkout" />


            <div className="container py-5">

                <h2 className="mb-4">
                    Checkout
                </h2>


                {bookingData ? (

                    <div className="card shadow-sm">

                        <div className="card-body">

                            <h4 className="mb-4">
                                Booking Summary
                            </h4>


                            <p>
                                <strong>Guest Name:</strong>{" "}
                                {bookingData.guest_name}
                            </p>


                            <p>
                                <strong>Email:</strong>{" "}
                                {bookingData.email}
                            </p>


                            <p>
                                <strong>Mobile:</strong>{" "}
                                {bookingData.mobile_number}
                            </p>


                            <hr />


                            <p>
                                <strong>Check-in:</strong>{" "}
                                {new Date(
                                    bookingData.check_in
                                ).toLocaleDateString()}
                            </p>


                            <p>
                                <strong>Check-out:</strong>{" "}
                                {new Date(
                                    bookingData.check_out
                                ).toLocaleDateString()}
                            </p>


                            <p>
                                <strong>Guests:</strong>{" "}
                                {bookingData.guests}
                            </p>


                            <hr />


                            <p>
                                <strong>Room Price:</strong>{" "}
                                ₹{bookingData.room_price} / night
                            </p>


                            <p>
                                <strong>Total Nights:</strong>{" "}
                                {bookingData.total_nights}
                            </p>


                            <h4 className="mt-3">
                                Total Amount: ₹{bookingData.total_amount}
                            </h4>


                            <span className="badge text-start text-dark mt-2 d-block w-25">
                                Status: {bookingData.status}
                            </span>


                            <button
                                type="button"
                                className="btn btn-primary mt-3"
                                onClick={createPaymentOrder}
                            >
                                Proceed to Payment
                            </button>


                        </div>

                    </div>

                ) : (

                    <div className="alert alert-info">
                        Loading booking details...
                    </div>

                )}

            </div>

        </>

    );

}


export default function Page() {

    return (

        <Suspense
            fallback={
                <div className="container py-5">
                    <div className="alert alert-info">
                        Loading checkout...
                    </div>
                </div>
            }
        >

            <CheckoutPage />

        </Suspense>

    );

}