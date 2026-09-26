'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Contact() {

  let [contactDetails,setcontactDetails]=useState()

  useEffect(()=>{
    axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_WEBSITE_SETTING)
    .then((result)=>{
      if(result.data._status==true){
         setcontactDetails(result.data._data);
      }else{
         setcontactDetails('');
      }
    }).catch((error)=>{
      console.log(error);
    })
  },[])



  return (
    <div className="container-xxl py-5">
  <div className="container">
    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
      <h6 className="section-title text-center text-primary-text text-uppercase">
        Contact Us
      </h6>
      <h1 className="mb-5">Contact For Any Query</h1>
    </div>

    <div className="row g-4">
      <div className="col-lg-12 wow fadeInUp" data-wow-delay="0.1s">

        <div className="mb-4">
          <h5 className="text-primary-text">Mobile</h5>
          <p className="mb-0">
            <a
             href={`tel:${contactDetails?.phone}`}
              className="text-decoration-none text-dark"
            >
              {contactDetails?.phone}
            </a>
          </p>
        </div>

        <div className="mb-4">
          <h5 className="text-primary-text">Email</h5>
          <p className="mb-0">
            <a
              href={`mailto:${contactDetails?.email}`}
              className="text-decoration-none text-dark"
            >
              {contactDetails?.email}
            </a>
          </p>
        </div>

        <iframe
          className="rounded w-100"
          src={contactDetails?.address}
          style={{ minHeight: "450px", border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        />
      </div>
    </div>
  </div>
</div>
  )
}
