import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function EditSlider() {

 const params=useParams();
 const id = params.id;


 let navigate=useNavigate();

 let [viewSlider,setviewSlider]=useState([])



 useEffect(()=>{
   axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_SLIDER_DETAIL,{id:id})
   .then((result)=>{
      if(result.data._status==true){
         setviewSlider(result.data._data);
         console.log(result.data._data);
       
      }else{
         setviewSlider()
        
      }
   }).catch((error)=>{
      console.log(error)
   })
 },[id])


// for slider update

let handleSubmit=(event)=>{
   event.preventDefault();

   let formData=new FormData();
   formData.append('sub_heading',event.target.subheading.value);
   formData.append('heading',event.target.heading.value);
   formData.append('button_txt',event.target.button_txt.value);
   formData.append('button_link',event.target.button_link.value);
   formData.append('second_btn_txt',event.target.button_txt_two.value);
   formData.append('second_btn_link',event.target.button_link_two.value);

   if(event.target.image.files[0]){
      formData.append('image',event.target.image.files[0]);
   }

   axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_SLIDER_UPDATE+'/'+id,formData)
   .then((result)=>{
      if(result.data._status==true){
         toast.success(result.data._message)
         navigate('/add-slider')
      }else{
         console.log(result.data._message)
          console.log(result.data)
      }
   }).catch((error)=>{
      console.log(error)
   })

}




  return (
    <div className="container my-4">
   <div className="row">
      <div className="col-lg-3"></div>
      <div className="col-lg-6">
         <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
               <h6 className="mb-0">Edit Slider</h6>
            </div>
            <div className="card-body">
               <form enctype="multipart/form-data" onSubmit={handleSubmit}>
                  <div className="mb-3"><label className="form-label">Sub Heading</label><input className="form-control" placeholder="Enter sub heading" type="text" name="subheading" defaultValue={viewSlider.sub_heading}/></div>
                  <div className="mb-3"><label className="form-label">Heading</label><input className="form-control" placeholder="Enter heading" type="text" name="heading" defaultValue={viewSlider.heading}/></div>
                  <div className="mb-3"><label className="form-label">Button Text</label><input className="form-control" placeholder="Enter button text" type="text" name="button_txt" defaultValue={viewSlider.button_txt}/></div>
                  <div className="mb-3"><label className="form-label">Button Link</label><input className="form-control" placeholder="Enter button link" type="text" name="button_link" defaultValue={viewSlider.button_link}/></div>
                  <div className="mb-3"><label className="form-label">Button Text Two</label><input className="form-control" placeholder="Enter button text" type="text" name="button_txt_two" defaultValue={viewSlider.second_btn_txt}/></div>
                  <div className="mb-3"><label className="form-label">Button Link Two</label><input className="form-control" placeholder="Enter button link" type="text" name="button_link_two" defaultValue={viewSlider.second_btn_link}/></div>
                  <div className="mb-3"><label className="form-label">Slider Image</label><input className="form-control" type="file" name="image"/><img className="img-fluid" src={viewSlider.image} alt="Slider Image"/></div>
                  <div className="text-end"><button type="submit" className="btn btn-success">Update Slider</button></div>
               </form>
            </div>
         </div>
      </div>
      <div className="col-lg-3"></div>
   </div>
</div>
  )
}
