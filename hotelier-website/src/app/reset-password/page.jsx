'use client';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Breadcrumb from '../components/common/Breadcrumb'


export default function page() {

  let [submitStatus,setsubmitStatus]=useState(false);

 const searchParams=useSearchParams();
 const token=searchParams.get('token');

 const router=useRouter();

 let handleSubmit=(event)=>{
  event.preventDefault();
   setsubmitStatus(true);

   axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_WEBSITE_USER_RESET_PASSWORD,event.target,{
       headers: {
            Authorization: `Bearer ${token}`
    }
   }).then((result)=>{
      if(result.data._status==true){
       toast.success(result.data._message);
       router.push('/login-register')
       setsubmitStatus(true);
    }else{
         toast.error(result.data._message);
         setsubmitStatus(true);
    }
   }).catch((error)=>{
     toast.error(error);
     setsubmitStatus(false);
  })
 }



  return (
    <>
      <Breadcrumb title="Reset Password" />
      <section className="pt-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-4 col-md-6">
              <div className="card shadow-lg border-0">
                <div className="card-body p-4">
                  <h5 className="text-center ">Reset Password</h5>
                  <form autocomplete="off"  onSubmit={handleSubmit}>
                    <div className="mb-3"><label className="form-label">New Password</label>
                      <input className="form-control" placeholder="Enter New Password" type="password" name="new_password" />
                    </div>
                    <div className="mb-3"><label className="form-label">Confirm Password</label>
                      <input className="form-control" placeholder="Confirm Password" type="password" name="confirm_password" />
                    </div>
                  <button
              type="submit"
              className="btn btn-success w-100"
             disabled={submitStatus}>
        {submitStatus ? 'Sending...' : 'Reset Password ' }
            </button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
