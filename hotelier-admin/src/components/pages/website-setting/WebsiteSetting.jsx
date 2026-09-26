import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';


export default function WebsiteSetting() {
   let [setting,setsetting]=useState()
  
   let [update,setupdate]=useState(false)

    useEffect(()=>{
     axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_WEBSITE_SETTING_VIEW)
     .then((result)=>{
        if(result.data._status==true){
            setsetting(result.data._data)
            // console.log(result.data._data)
        }else{
            setsetting()
            // console.log(result.data.message)
        }
     })
     .catch((error)=>{
        // console.log(error)
     })
    },[update])
 


    let formSubmit=(event)=>{
        event.preventDefault();
        let formData=new FormData();

        formData.append('sitename',event.target.sitename.value)
        formData.append('phone',event.target.phone.value)
        formData.append('email',event.target.email.value)
        formData.append('address',event.target.address.value)
        formData.append(
  'social_links',
  JSON.stringify({
    facebook: event.target.facebook.value,
    twitter: event.target.twitter.value,
    instagram: event.target.instagram.value,
    youtube: event.target.youtube.value,
  })
);
        if(event.target.logo.files[0]){
            formData.append('logo',event.target.logo.files[0])
        }

        axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_WEBSITE_SETTING_UPDATE,formData)
        .then((result)=>{
            if(result.data._status==true){
                toast.success(result.data._message)
                // console.log(result.data.message)
                setupdate(!update)
            }else{
                toast.error(result.data._message)
                // console.log(result.data._message)
            }
        }).catch((error)=>{
            // console.log(error)
        })
    }


  return (
        <div className="container my-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Website Settings</h5>
                </div>

                <div className="card-body">
                    <form  encType="multipart/form-data" onSubmit={formSubmit}>

                        {/* Site Name */}
                        <div className="mb-3">
                            <label className="form-label">Site Name</label>
                            <input
                                type="text"
                                name="sitename"
                                className="form-control"
                                placeholder="Enter Site Name"
                                defaultValue={setting?.sitename}
                            />
                        </div>

                        {/* Phone */}
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                placeholder="Enter Phone Number"
                                defaultValue={setting?.phone}
                            />
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                defaultValue={setting?.email}
                                placeholder="Enter Email Address"
                            />
                        </div>
                        {/* address */}
                        
                          <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder="Enter Address"
                                defaultValue={setting?.address}
                            />
                        </div>



                         {/* facebook */}
                        <div className="mb-3">
                            <label className="form-label">Facebook URL</label>
                            <input
                                type="url"
                                name="facebook"
                                className="form-control"
                                defaultValue={setting?.social_links?.facebook}
                                placeholder="Enter Facebook URL"
                            />
                        </div>
                        

                          {/* twitter */}
                        <div className="mb-3">
                            <label className="form-label">Twitter URL</label>
                            <input
                                type="url"
                                name="twitter"
                                className="form-control"
                                defaultValue={setting?.social_links?.twitter}
                                placeholder="Enter Twitter URL"
                            />
                        </div>
                        

                          {/* instagram */}
                        <div className="mb-3">
                            <label className="form-label">Instagram URL</label>
                            <input
                                type="url"
                                name="instagram"
                                className="form-control"
                                defaultValue={setting?.social_links?.instagram}
                                placeholder="Enter Instagram URL"
                            />
                        </div>


                           {/* youtube */}
                        <div className="mb-3">
                            <label className="form-label">YouTube URL</label>
                            <input
                                type="url"
                                name="youtube"
                                className="form-control"
                                defaultValue={setting?.social_links?.youtube}
                                placeholder="Enter YouTube URL"
                            />
                        </div>

                      


                        {/* Logo Upload */}
                        <div className="mb-3">
                            <label className="form-label">Logo</label>
                            <input
                                type="file"
                                name="logo"
                                className="form-control"
                            />
                            {setting?.logo &&(
                                <img src={setting.logo} alt="Current Logo" className="mt-3" style={{ maxWidth: '150px' }} />
                            )}
                         
                        </div>



                        {/* Submit Button */}
                        <div className="text-end">
                            <button type="submit" className="btn btn-success">
                                <i className="fas fa-save me-2"></i>
                                Update Settings
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
  )
}
