import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function About() {
 let [about, setAbout] = useState();
 let [imagePath,setimagePath] = useState();

 useEffect(()=>{
  axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_ABOUT_VIEW)
  .then((result)=>{
   if(result.data._status==true){
       setAbout(result.data._data);
       setimagePath(result.data._about_setting_image_path);
   }else{
    setAbout(null);
    setimagePath(null);
   }
  }).catch((error)=>{
   console.log(error);
  })
 },[])



 let handleSubmit = (event)=>{
   event.preventDefault();
   let formData=new FormData();
   formData.append('sub_heading',event.target.sub_heading.value);
   formData.append('heading',event.target.heading.value);
   formData.append('description',event.target.description.value);
   formData.append('button_txt',event.target.button_txt.value);
   formData.append('button_link',event.target.button_link.value);
   if(event.target.image.files.length>0){
      formData.append('image',event.target.image.files[0])
   }
   
   axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_ABOUT_UPDATE,formData)
   .then((result)=>{
      if(result.data._status==true){
         toast.success(result.data._message);
         setAbout(result.data._data);
      }else{
         toast.error(result.data._message);
      }
   }).catch((error)=>{
      console.log(error);
   })

 }




  return (
   <div className="container my-5">
   <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
         <h5 className="mb-0">About Settings</h5>
      </div>
      <div className="card-body">
         <form enctype="multipart/form-data" onSubmit={handleSubmit}>
            <div className="mb-3"><label className="form-label">Sub Heading</label><input className="form-control" placeholder="Enter Site Name" type="text" name="sub_heading" defaultValue={about?.sub_heading}/></div>
            <div className="mb-3"><label className="form-label">Heading</label><input className="form-control" placeholder="Enter Phone Number" type="text" name="heading" defaultValue={about?.heading}/></div>
            <div className="mb-3"><label className="form-label">Description</label><input className="form-control" placeholder="Enter Email Address" type="text" name="description" defaultValue={about?.description}/></div>
            <div className="mb-3"><label className="form-label">Button Text</label><input className="form-control" type="text" name="button_txt" defaultValue={about?.button_txt}/></div>
            <div className="mb-3"><label className="form-label">Button Link</label><input className="form-control" type="text" name="button_link" defaultValue={about?.button_link}/></div>
            <div className="mb-3">
               <label className="form-label">image</label><input className="form-control" type="file" name="image"/>
               <div className="mt-3"><img alt="Logo" className="img-thumbnail" src={imagePath + about?.image} style={{height: '80px'}}/></div>
            </div>
            <div className="text-end"><button type="submit" className="btn btn-success"><i className="fas fa-save me-2"></i>Update</button></div>
         </form>
      </div>
   </div>
</div>
  )
}
