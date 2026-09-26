import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function NewsletterSetting() {

    let [newsletterData,setNewsletterData]=useState([])
    
    useEffect(()=>{
      axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_NEWSLETTER_SETTING_VIEW)
      .then((result)=>{
        if(result.data._status==true){
           setNewsletterData(result.data._data)
           console.log(result.data._data)
        }else{
              setNewsletterData([])
        }
      }).catch((error)=>{
        console.log(error)
      })
    },[])


  return (
    <div class="container my-4">
   <div class="card shadow-sm">
      <div class="card-header bg-dark text-white">
         <h5 class="mb-0">Newsletter Subscribers</h5>
      </div>
      <div class="card-body p-0">
         <div class="table-responsive">
            <table className="table table-bordered table-hover mb-0">
               <thead className="table-light">
                  <tr>
                     <th width="80">S.No</th>
                     <th>Email</th>
                     <th>Created Date</th>
                  </tr>
               </thead>
               <tbody>
                  {newsletterData.length > 0 ? (
                     newsletterData.map((item, index) => (
                        <tr key={index}>
                           <td>{index + 1}</td>
                           <td>{item.email}</td>
                           <td>{item.createdAt}</td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan="3" className="text-center">No newsletter records found.</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   </div>
</div>
  )
}
