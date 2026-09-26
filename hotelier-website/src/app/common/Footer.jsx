'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-toastify'

export default function Footer() {
 let [menu,setmenu]=useState()

 let [setting,setsetting]=useState()


 useEffect(()=>{
    axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_WEBSITE_SETTING)
    .then((result)=>{
        if(result.data._status==true){
            setsetting(result.data._data)
            // console.log(result.data._data)
        }else{
            // console.log(result.data._message)
        }
    }).catch((error)=>{
        // console.log(error)
    })
 },[])


 useEffect(()=>{
    axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_WEBSITE_MENU)
    .then((result)=>{
        if(result.data._status==true){
            setmenu(result.data._data)
            // console.log(result.data._data)
        }else{
            // console.log(result.data._message)
        }
    }).catch((error)=>{
        // console.log(error)
    })
 },[])



 let handlesubmit=(event)=>{
   event.preventDefault()
   let email=event.target.email.value
   axios.post(process.env.NEXT_PUBLIC_API_URL+process.env.NEXT_PUBLIC_WEBSITE_NEWSLETTER,{email:email})
   .then((result)=>{
      if(result.data._status==true){
         toast.success(result.data._message)
         event.target.reset()
      }else{
         toast.error(result.data._message)
      }
   }).catch((error)=>{
      console.log(error)
   })
 }



  return (
   <div className="container-fluid bg-dark text-light footer pt-5 mt-5">
   <div className="container-fluid py-5">
      <div className="row g-4">
         <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-4">Quick Links</h5>
            <div className="d-flex flex-column gap-2">
            {menu?.filter(item => item.parentId==null).map((items,index)=>{
                return(
                       <Link className="text-light text-decoration-none" key={index} href={items.link}>{items.name}</Link>
                )
            })}
            </div>
         </div>
         <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-4">Contact</h5>
            <p className="mb-2"><a href={`tel:${setting?.phone}`} className="text-light text-decoration-none">{setting?.phone}</a></p>
            <p className="mb-3"><a href={`mailto:${setting?.email}`} className="text-light text-decoration-none">{setting?.email}</a></p>
         </div>
         <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-4">Newsletter</h5>
            <p className="small">Subscribe to our newsletter for latest updates.</p>
            <form onSubmit={handlesubmit}>
               <div className="input-group"><input className="form-control" type="email" placeholder="Your email" required name="email"/><button type="submit" className="btn btn-primary">Sign Up</button></div>
            </form>
         </div>
      </div>
   </div>
   <div className="container-fluid border-top border-secondary pt-3 pb-3 p-0">
      <div className="row">
         <div className="col-12 text-center">© 2026 <span className="fw-bold">{setting?.sitename}</span>. All Rights Reserved.</div>
      </div>
   </div>
</div> 
)
}