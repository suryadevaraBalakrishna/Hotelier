'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function Header() {

    const router = useRouter();

    const selectedRoom = useSelector(
        (state) => state.booking.selectedRoom
    );



    const login = useSelector((state) => state.login.token);




    const [setting, setsetting] = useState();

    const [menu, setmenu] = useState([]);


    // Go to booking page
    const goToBooking = () => {

        if (!selectedRoom) {
            toast.error("Please select a room first");
            return;
        }

        router.push("/booking");
    };


    // Bootstrap JS
    useEffect(() => {

        require('bootstrap/dist/js/bootstrap.bundle.min.js');

    }, []);


    // Get website settings
    useEffect(() => {

        axios
            .post(
                process.env.NEXT_PUBLIC_API_URL +
                process.env.NEXT_PUBLIC_WEBSITE_SETTING
            )
            .then((result) => {

                if (result.data._status === true) {

                    setsetting(result.data._data);


                } else {

                    console.log(result.data._message);

                }

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);


    // Get menu
    useEffect(() => {

        axios
            .post(
                process.env.NEXT_PUBLIC_API_URL +
                process.env.NEXT_PUBLIC_WEBSITE_MENU
            )
            .then((result) => {

                if (result.data._status === true) {

                    setmenu(result.data._data);

                } else {

                    console.log(result.data._message);

                }

            })
            .catch((error) => {

                console.log(error);

            });

    }, []);


    const DEFAULT_LOGO =
        "https://res.cloudinary.com/uf5y8vtd/image/upload/v1790428601/hotelier/settings/dwhaqen0iudbn2kr4hdb.png";


    return (

        <>
            <div className="container-fluid bg-dark px-0">

                <div className="row gx-0">


                    {/* DESKTOP LOGO */}

                    <div className="col-lg-3 bg-dark d-none d-lg-block">
                        <Link
                            href="/"
                            className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center"
                        >
                            <img
                                src={setting?.logo || DEFAULT_LOGO}
                                alt="Hotelier Logo"
                                className="img-fluid me-2"
                                style={{
                                    width: "70%",
                                    height: "auto"
                                }}
                            />
                        </Link>
                    </div>

                    <div className="col-lg-9">


                        {/* TOP HEADER */}

                        <div className="row gx-0 bg-white d-none d-lg-flex">

                            <div className="col-lg-7 px-5 text-start">

                                <div className="h-100 d-inline-flex align-items-center py-2 me-4">

                                    <i className="fa fa-envelope text-primary-text me-2"></i>

                                    <a
                                        href={`mailto:${setting?.email || 'info@hotelier.com'}`}
                                        className="mb-0 contact-info text-decoration-none"
                                    >
                                        {setting?.email || 'info@hotelier.com'}
                                    </a>

                                </div>


                                <div className="h-100 d-inline-flex align-items-center py-2">

                                    <i className="fa fa-phone-alt text-primary-text me-2"></i>

                                    <a
                                        href={`tel:${setting?.phone || '+01234567890'}`}
                                        className="mb-0 contact-info text-decoration-none"
                                    >
                                        {setting?.phone || '+012 345 67890'}
                                    </a>

                                </div>

                            </div>


                            {/* SOCIAL LINKS */}

                            <div className="col-lg-5 px-5 text-end">

                                <div className="d-inline-flex align-items-center py-2">

                                    <a
                                        className="me-3"
                                        href={setting?.social_links?.facebook || '#'}
                                    >
                                        <i className="fab fa-facebook-f"></i>
                                    </a>


                                    <a
                                        className="me-3"
                                        href={setting?.social_links?.twitter || '#'}
                                    >
                                        <i className="fab fa-twitter"></i>
                                    </a>


                                    <a
                                        className="me-3"
                                        href={setting?.social_links?.instagram || '#'}
                                    >
                                        <i className="fab fa-instagram"></i>
                                    </a>


                                    <a
                                        href={setting?.social_links?.youtube || '#'}
                                    >
                                        <i className="fab fa-youtube"></i>
                                    </a>

                                </div>

                            </div>

                        </div>


                        {/* NAVBAR */}

                        <nav className="navbar navbar-expand-lg bg-dark navbar-dark p-3 p-lg-0">


                            {/* MOBILE LOGO */}

                            <div className="d-flex align-items-center justify-content-between w-100 d-lg-none">

                                <Link
                                    href="/"
                                    className="navbar-brand m-0"
                                >

                                     <img
                                src={setting?.logo || DEFAULT_LOGO}
                                alt="Hotelier Logo"
                                className="img-fluid me-2"
                                style={{
                                    width: "70%",
                                    height: "auto"
                                }}
                                 />
                                </Link>


                                <button
                                    type="button"
                                    className="navbar-toggler"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarCollapse"
                                    aria-controls="navbarCollapse"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >

                                    <span className="navbar-toggler-icon"></span>

                                </button>

                            </div>


                            {/* NAVBAR COLLAPSE */}

                            <div
                                className="collapse navbar-collapse justify-content-between text-uppercase"
                                id="navbarCollapse"
                            >


                                {/* MENU */}

                                <div className="navbar-nav mr-auto py-0">

                                    {menu
                                        .filter(
                                            (item) =>
                                                item.parentId === null
                                        )
                                        .sort(
                                            (a, b) =>
                                                a.order - b.order
                                        )
                                        .map((parent) => {


                                            const childMenus = menu
                                                .filter(
                                                    (child) =>
                                                        child.parentId?._id ===
                                                        parent._id
                                                )
                                                .sort(
                                                    (a, b) =>
                                                        a.order - b.order
                                                );


                                            // Dropdown menu
                                            if (childMenus.length > 0) {

                                                return (

                                                    <div
                                                        className="nav-item dropdown"
                                                        key={parent._id}
                                                    >

                                                        <Link
                                                            href={
                                                                parent.link ||
                                                                "#"
                                                            }
                                                            className="nav-link dropdown-toggle"
                                                            data-bs-toggle="dropdown"
                                                            aria-expanded="false"
                                                        >
                                                            {parent.name}
                                                        </Link>


                                                        <div className="dropdown-menu rounded-0 m-0">

                                                            {childMenus.map(
                                                                (child) => (

                                                                    <Link
                                                                        key={child._id}
                                                                        href={
                                                                            child.link
                                                                        }
                                                                        className="dropdown-item"
                                                                    >
                                                                        {child.name}
                                                                    </Link>

                                                                )
                                                            )}

                                                        </div>

                                                    </div>

                                                );

                                            }


                                            // Normal menu
                                            return (

                                                <Link
                                                    key={parent._id}
                                                    href={parent.link}
                                                    className="nav-item nav-link"
                                                >
                                                    {parent.name}
                                                </Link>

                                            );

                                        })}

                                </div>


                                {/* RIGHT SIDE BUTTONS */}

                                <div className="d-flex align-items-center ms-auto">


                                    {/* BOOKING BUTTON */}

                                    <button
                                        type="button"
                                        onClick={goToBooking}
                                        className="btn btn-outline-light position-relative me-3 d-none d-lg-block"
                                    >

                                        <i className="fa-solid fa-calendar-check me-2"></i>

                                        Booking


                                        {/* Selected Room Count */}

                                        {selectedRoom && (

                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">

                                                1

                                            </span>

                                        )}

                                    </button>


                                    {/* LOGIN BUTTON */}

                                    <Link
                                        href="/login-register"
                                        className="btn-primary-btn text-white rounded-0 py-4 px-md-2 d-none d-lg-block text-uppercase"
                                    >

                                        {login ? "My Account" : "Register/Login"}

                                        <i className="fa-solid fa-arrow-right ms-3 text-white"></i>

                                    </Link>

                                </div>


                            </div>


                        </nav>


                    </div>

                </div>

            </div>

        </>

    );

}