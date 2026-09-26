'use client'
import React, { useState } from 'react'
import Breadcrumb from '../components/common/Breadcrumb'
import { useDispatch } from 'react-redux';
import { logOut } from '../slice/loginSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function page() {

    let [userData, setuserData] = useState({});
   
    let [bookings, setBookings] = useState([]);

    let [formSubmit, setformSubmit] = useState(false);


    let [activeTab, setactiveTab] = useState("dashboard");

    let dispatch = useDispatch();

    const router = useRouter();

    let logoutUser = () => {
        dispatch(logOut())
        router.push('/login-register');
    }


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
    }, [formSubmit])







    let handleUpdate = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', event.target.name.value);
        formData.append('mobile_number', event.target.mobile_number.value);
        if (event.target.image.files[0]) {
            formData.append('image', event.target.image.files[0]);
        }
        axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_WEBSITE_USER_UPDATE_PROFILE, formData, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            if (result.data._status == true) {
                toast.success('Profile updated successfully');
                setformSubmit(!formSubmit);
            } else {
                toast.error(result.data._message);
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    let handleChangePassword = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('current_password', event.target.current_password.value);
        formData.append('new_password', event.target.new_password.value);
        formData.append('confirm_password', event.target.confirm_password.value);

        axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_WEBSITE_USER_CHANGE_PASSWORD, formData, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }).then((result) => {
            if (result.data._status == true) {
                toast.success(result.data._message);
            } else {
                toast.error(result.data._message)
            }
        })
            .catch(() => {
                toast.error('something error');
            })


    }




    useEffect(() => {

        if (!userToken) {
            return;
        }

        axios.post(
            process.env.NEXT_PUBLIC_API_URL +
            process.env.NEXT_PUBLIC_WEBSITE_BOOKING_MY_BOOKINGS,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${userToken}`
                }
            }
        )
            .then((result) => {

                if (result.data._status === true) {

                    setBookings(result.data._data);

                    console.log("My Bookings:", result.data._data);

                } else {

                    toast.error(result.data._message);

                }

            })
            .catch((error) => {

                console.log("Bookings Error:", error);

            });

    }, [userToken]);


    return (
        <>
            <Breadcrumb title="Dashboard" />
            <div className="container py-5">
                <div className="mb-4">
                    <h2 className="fw-bold">Welcome to your Dashboard</h2>
                </div>
                <div className="row">
                    <div className="col-lg-3 mb-4">
                        <div className="list-group">
                            <button className="list-group-item list-group-item-action active" onClick={() => setactiveTab('dashboard')}>My Dashboard</button>
                            <button className="list-group-item list-group-item-action" onClick={() => setactiveTab('orders')}>Orders</button>
                            <button className="list-group-item list-group-item-action" onClick={() => setactiveTab('my-profile')}>My Profile</button>
                            <button className="list-group-item list-group-item-action" onClick={() => setactiveTab('change-password')}>Change Password</button>
                            <button className="list-group-item list-group-item-action text-danger" onClick={logoutUser}>
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-9">



                        {activeTab == 'dashboard' && (
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="mb-5">
                                        <h4 className="fw-bold mb-3">My Dashboard</h4>
                                        <p className="text-muted">Welcome to your dashboard.</p>
                                    </div>
                                </div>
                            </div>
                        )}


                        {activeTab == 'orders' && (
                            <div className="card shadow-sm">
                                <div className="card-body">

                                    <div className="mb-4">
                                        <h4 className="fw-bold mb-3">
                                            My Bookings
                                        </h4>
                                    </div>

                                    {bookings.length > 0 ? (

                                        bookings.map((booking) => (

                                            <div
                                                className="card mb-3 border"
                                                key={booking._id}
                                            >

                                                <div className="card-body">

                                                    <div className="row">

                                                        <div className="col-md-8">

                                                            <h5 className="fw-bold">
                                                                {booking.hotel_id?.name}
                                                            </h5>

                                                            <p className="mb-2">
                                                                <strong>Room:</strong>{" "}
                                                                {booking.room_id?.name}
                                                            </p>

                                                            <p className="mb-2">
                                                                <strong>Guest Name:</strong>{" "}
                                                                {booking.guest_name}
                                                            </p>

                                                            <p className="mb-2">
                                                                <strong>Check-in:</strong>{" "}
                                                                {new Date(
                                                                    booking.check_in
                                                                ).toLocaleDateString()}
                                                            </p>

                                                            <p className="mb-2">
                                                                <strong>Check-out:</strong>{" "}
                                                                {new Date(
                                                                    booking.check_out
                                                                ).toLocaleDateString()}
                                                            </p>

                                                            <p className="mb-2">
                                                                <strong>Guests:</strong>{" "}
                                                                {booking.guests}
                                                            </p>

                                                            <p className="mb-2">
                                                                <strong>Total Nights:</strong>{" "}
                                                                {booking.total_nights}
                                                            </p>

                                                        </div>

                                                        <div className="col-md-4">

                                                            <p className="mb-2">
                                                                <strong>Room Price:</strong>{" "}
                                                                ₹{booking.room_price}
                                                            </p>

                                                            <p className="mb-2">
                                                                <strong>Total Amount:</strong>{" "}
                                                                ₹{booking.total_amount}
                                                            </p>

                                                            <p className="mb-2">
                                                                <strong>Status:</strong>
                                                            </p>

                                                            <span
                                                                className={
                                                                    booking.status === "confirmed"
                                                                        ? "badge bg-success"
                                                                        : booking.status === "pending"
                                                                            ? "badge bg-warning text-dark"
                                                                            : booking.status === "cancelled"
                                                                                ? "badge bg-danger"
                                                                                : "badge bg-secondary"
                                                                }
                                                            >
                                                                {booking.status}
                                                            </span>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        ))

                                    ) : (

                                        <div className="alert alert-info">
                                            You don't have any bookings yet.
                                        </div>

                                    )}

                                </div>
                            </div>
                        )}

                        {activeTab == 'my-profile' && (
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div className="mb-5">
                                        <h4 className="fw-bold mb-3">My Profile</h4>
                                        <form onSubmit={handleUpdate}>
                                            <div className="mb-3"><label className="form-label">Name</label><input className="form-control" placeholder="Enter your name" type="text" name="name" defaultValue={userData.name} /></div>
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <p className="form-control-plaintext"> t3351192@gmail.com</p>
                                            </div>
                                            <div className="mb-3"><label className="form-label">Phone Number</label><input className="form-control" placeholder="Enter phone number" type="text" name="mobile_number" defaultValue={userData.mobile_number} /></div>
                                            <div className="mb-3">
                                                <label className="form-label">Image</label>
                                                <div><img className="img-fluid" src={userData.image} /></div>
                                                <input className="form-control" placeholder="Enter phone number" type="file" name="image" />
                                            </div>
                                            <button className="btn btn-primary" type="submit">Update Profile</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        )}


                        {activeTab == 'change-password' && (
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <div>
                                        <h4 className="fw-bold mb-3">Change Password</h4>
                                        <form onSubmit={handleChangePassword}>
                                            <div className="mb-3"><label className="form-label">Current Password</label><input className="form-control" placeholder="Current Password" type="password" name="current_password" /></div>
                                            <div className="mb-3"><label className="form-label">New Password</label><input className="form-control" placeholder="New Password" type="password" name="new_password" /></div>
                                            <div className="mb-3"><label className="form-label">Confirm Password</label><input className="form-control" placeholder="Confirm Password" type="password" name="confirm_password" /></div>
                                            <button className="btn btn-danger" type="submit">Update Password</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    )
}
