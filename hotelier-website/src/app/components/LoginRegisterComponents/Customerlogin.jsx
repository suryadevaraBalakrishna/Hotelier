'use client'
import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { userDetails } from '@/app/slice/loginSlice';

export default function Customerlogin() {
   let [loading, setLoading] = useState(false);

   const [loginStatus, setloginStatus] = useState(false);


   let [showPassword,setshowPassword]=useState(true);


   const dispatch = useDispatch();

   const router = useRouter();






   let registerUser = (event) => {
      event.preventDefault();
      setLoading(true);

      let formData = new FormData();
      formData.append('name', event.target.name.value);
      formData.append('mobile_number', event.target.mobile_number.value);
      formData.append('email', event.target.email.value);
      formData.append('password', event.target.password.value);
      if (event.target.image.files[0]) {
         formData.append('image', event.target.image.files[0]);
      }

      axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_WEBSITE_USER_REGISTER, formData)
         .then((result) => {
            if (result.data._status == true) {
               toast.success('Now you can login with your credentials');
               event.target.reset();
               setLoading(false);
            } else {
               toast.error(result.data._message);
               setLoading(false);
            }
         }).catch((error) => {
            console.log(error);
            setLoading(false);
         })


   }




   let loginUser = (event) => {
      event.preventDefault();

      setloginStatus(true);

      axios.post(process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_WEBSITE_USER_LOGIN, {
         email: event.target.email.value,
         password: event.target.password.value
      }).then((result) => {
         if (result.data._status == true) {
            toast.success(result.data._message);
            setloginStatus(true);
            dispatch(userDetails({
               user: result.data._data,
               token: result.data._token
            }))
            Cookies.set('token', result.data._token);
            router.push('/my-dashboard');
         } else {
            toast.error(result.data._message);
            setloginStatus(false);
         }
      })
         .catch(() => {
            toast.error('Something went wrong');
            setloginStatus(false);
         })


   }



   return (
      <div className="container py-5">
         <div className="row g-4">
            <div className="col-lg-6">
               <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                     <h3 className="mb-4 text-center">Login</h3>
                     <form onSubmit={loginUser}>
                        <div className="mb-3"><label className="form-label">Email Address</label><input className="form-control" placeholder="Enter your email" type="email" name="email" /></div>
                        <div className="mb-3"><label className="form-label">Password</label><input className="form-control" placeholder="Enter password" type={showPassword ? "password":"text"} name="password" /></div>
                        <div className="check"><input type="checkbox" onChange={()=>{setshowPassword(!showPassword)}} />show password</div>

                        <a href="/forgot-password" className="text-decoration-none">forgot password</a>
                        <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loginStatus ? 'disabled' : ''}>Login</button>
                        <button className="btn btn-outline-dark w-100 mt-3">Continue with Google</button>
                     </form>
                  </div>
               </div>
            </div>
            <div className="col-lg-6">
               <div className="card shadow-sm border-0">
                  <div className="card-body p-4">
                     <h3 className="mb-4 text-center">Register</h3>
                     <form encType="multipart/form-data" onSubmit={registerUser}>
                        <div className="mb-3"><label className="form-label">Name *</label><input className="form-control" placeholder="Enter your name" type="text" name="name" required /></div>
                        <div className="mb-3"><label className="form-label">Mobile Number *</label><input className="form-control" placeholder="Enter mobile number" type="text" name="mobile_number" /></div>
                        <div className="mb-3"><label className="form-label">Email Address *</label><input className="form-control" placeholder="Enter email address" type="email" name="email" /></div>
                        <div className="mb-3"><label className="form-label">Password *</label><input className="form-control" placeholder="Create password" type="password" name="password" /></div>
                        <div className="mb-3"><label className="form-label">Image</label><input className="form-control" placeholder="Create password" required="" type="file" name="image" /></div>
                        <button type="submit" disabled={loading ? 'disabled' : ''} className="btn btn-success w-100 mt-2">Register</button>

                        <button className="btn btn-outline-dark w-100 mt-3">
                           Continue with Google
                        </button>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
