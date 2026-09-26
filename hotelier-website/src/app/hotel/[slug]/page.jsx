'use client';
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/common/Breadcrumb'
import { useParams } from 'next/navigation'
import axios from 'axios';
import Slider from "react-slick";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRoom } from '@/app/slice/bookingSlice';

export default function page() {

   var settings = {
      arrows: true,
      infinite: true,
      speed: 200,
      slidesToShow: 1,
      slidesToScroll: 1,
   };



   const params = useParams();
   const slug = params.slug;

   let [hotelDetail, sethotelDetail] = useState([]);
   let [roomDetail, setroomDetail] = useState([]);
   let [imagePath, setimagePath] = useState([]);
   let [roomimagePath, setroomimagePath] = useState([]);



   useEffect(() => {
      axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_WEBSITE_HOTEL_DETAIL, {
         slug: slug
      })
         .then((result) => {
            if (result.data._status == true) {
               sethotelDetail(result.data._data.hotel);
               setroomDetail(result.data._data.rooms);
               setimagePath(result.data._hotel_setting_image_path);
               setroomimagePath(result.data._room_setting_image_path);

            } else {
               sethotelDetail();
               setimagePath();
               setroomDetail();
               setroomimagePath();
            }
         }).catch((error) => {
            console.log(error);

         })

   }, [])




   // booking

   let dispatch = useDispatch();

   const selectedRoom = useSelector((state) => state.booking.selectedRoom);


   return (
      <>
         <Breadcrumb title="Hotel" />
         <div className="container py-5">
            <div className="row g-4">
               <div className="col-lg-6">
                  <div className="card border-0 shadow-sm">
                     {hotelDetail.image ? (
                        <img
                           className="img-fluid rounded"
                           alt="Web Development"
                           src={imagePath + hotelDetail.image}
                        />
                     ) : (
                        <p></p>
                     )}
                  </div>
               </div>
               <div className="col-lg-6">
                  <div className="card border-0 shadow-sm h-100">
                     <div className="card-body">
                        <h2 className="fw-bold mb-3">{hotelDetail?.name}</h2>

                        <h4 className="text-primary mb-3">{hotelDetail?.location}</h4>
                        <p className="text-muted">
                           {hotelDetail?.description}
                        </p>

                     </div>
                  </div>
               </div>
            </div>

         </div>


         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <h2>Choose Rooms</h2>
               </div>
            </div>

            <div className="row g-4">
               {roomDetail.map((room, index) => (
                  <div
                     className="col-lg-4 col-md-6 wow fadeInUp"
                     data-wow-delay="0.1s"
                     key={room._id}
                  >
                     <div className="room-item shadow rounded overflow-hidden">
                        <div className="position-relative">
                           <Slider {...settings}>
                              {room.images.map((items, index) => {
                                 return (
                                    <img
                                       className="img-fluid"
                                       src={roomimagePath + items}
                                       alt={room.name}
                                    />
                                 )
                              })}

                           </Slider>
                        </div>

                        <div className="p-4 mt-2">
                           <div className="d-flex justify-content-between mb-3">
                              <h5>{room.name}</h5>
                              <h5 className="text-primary">₹{room.price}</h5>
                           </div>

                           <p>{room.description}</p>

                           <p>
                              <strong>Guests:</strong> {room.maxGuests}
                           </p>

                           <p>
                              <strong>Available Rooms:</strong> {room.totalRooms}
                           </p>

                           <button
                              className="btn btn-primary w-100" onClick={() => {
                                 dispatch(setSelectedRoom(room));
                                 console.log("Selected Room:", room);
                              }}
                           >
                              {selectedRoom?._id === room._id
                                 ? "Selected"
                                 : "Select Room"}
                           </button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>







      </>
   )
}
