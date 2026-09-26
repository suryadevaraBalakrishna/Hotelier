'use client'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ForgotPassword() {

     let [submitStatus,setsubmitStatus]=useState(false);

 

  let handleSubmit=(event)=>{
    event.preventDefault();
     setsubmitStatus(true);
     axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_WEBSITE_USER_FORGOT_PASSWORD,event.target)
     .then((result)=>{
        if(result.data._status==true){
        toast.success(result.data._message);
    }else{
        toast.error(result.data._message)
    }
     }).catch(()=>{
         toast.error('Something went wrong');
   })
    
  }




  return (
    <div className="py-5 bg-white">
   <div className="container">
      <div className="row justify-content-center">
         <div className="col-lg-4 col-md-6 col-12">
            <div className="account_form border p-4 shadow-sm rounded">
               <h2 className="h4 mb-4 text-center">Forgot Password</h2>
               <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="mb-3"><label  className="form-label">Email <span className="text-danger">*</span></label><input type="email" id="login-email" placeholder="Email Address" className="form-control" name="email"/></div>
                  <button
              type="submit"
              className="btn btn-success w-100"
             disabled={submitStatus}>
                 {submitStatus ? 'Sending' : 'Send Password Reset' }
            </button>

               </form>
            </div>
         </div>
      </div>
   </div>
</div>
  )
}
