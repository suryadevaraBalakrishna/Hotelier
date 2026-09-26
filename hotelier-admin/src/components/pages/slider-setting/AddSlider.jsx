import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function AddSlider() {
  let [viewSlider,setviewSlider]=useState([])
  let [sliderImage,setsliderImage]=useState()
  let [createStatus,setcreateStatus]=useState(false)
  let [deleteStatus,setdeleteStatus]=useState(false)

  useEffect(()=>{
   axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_SLIDER_VIEW)
   .then((result)=>{
      if(result.data._status==true){
         setviewSlider(result.data._data);
         console.log(result.data._data);
         setsliderImage(result.data._slider_image_path);
      }else{
         setviewSlider()
         setsliderImage()
      }
   }).catch((error)=>{
      console.log(error)
   })
  },[createStatus,deleteStatus])



//slider create

let handleSubmit=(event)=>{
   event.preventDefault();

   let formData=new FormData();
   formData.append('sub_heading',event.target.subheading.value);
   formData.append('heading',event.target.heading.value);
   formData.append('button_txt',event.target.button_txt.value);
   formData.append('button_link',event.target.button_link.value);
   formData.append('second_btn_txt',event.target.button_txt_two.value);
   formData.append('second_btn_link',event.target.button_link_two.value);
   formData.append('image',event.target.image.files[0]);

   axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_SLIDER_CREATE,formData)
   .then((result)=>{
      if(result.data._status==true){
         setcreateStatus(!createStatus)
         event.target.reset();
      }else{
         console.log(result.data._message)
          console.log(result.data)
      }
   }).catch((error)=>{
      console.log(error)
   })
}


//slider delete

let handleDelete=(id)=>{
   if(!window.confirm("Are you sure want to delete this slider?")){
      return false;
   }else{
        axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_SLIDER_DELETE,{id:id})
   .then((result)=>{
      if(result.data._status==true){
         setdeleteStatus(!deleteStatus)
      }else{
         console.log(result.data._message)
      }
   }).catch((error)=>{
      console.log(error)
   })
   }

}


  return (
   <div className="container my-4">
   <div className="row">
      <div className="col-md-4">
         <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
               <h6 className="mb-0">Add Slider</h6>
            </div>
            <div className="card-body">
               <form enctype="multipart/form-data" onSubmit={handleSubmit}>
                  <div className="mb-3"><label className="form-label">Sub Heading</label><input className="form-control" placeholder="Enter sub heading" type="text" name="subheading"/></div>
                  <div className="mb-3"><label className="form-label">Heading</label><input className="form-control" placeholder="Enter heading" type="text" name="heading"/></div>
                  <div className="mb-3"><label className="form-label">Button Text</label><input className="form-control" placeholder="Enter button text" type="text" name="button_txt"/></div>
                  <div className="mb-3"><label className="form-label">Button Link</label><input className="form-control" placeholder="Enter button link" type="text" name="button_link"/></div>
                  <div className="mb-3"><label className="form-label">Button Text Two</label><input className="form-control" placeholder="Enter button text" type="text" name="button_txt_two"/></div>
                  <div className="mb-3"><label className="form-label">Button Link Two</label><input className="form-control" placeholder="Enter button link" type="text" name="button_link_two"/></div>
                  <div className="mb-3"><label className="form-label">Slider Image</label><input className="form-control" type="file" name="image"/></div>
                  <div className="text-end"><button type="submit" className="btn btn-success">Save Slider</button></div>
               </form>
            </div>
         </div>
      </div>
      <div className="col-md-8">
         <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
               <h6 className="mb-0">Slider List</h6>
            </div>
            <div className="card-body p-0">
               {viewSlider.length==0?<div className="text-center p-3">No Slider Found</div>:
                <div className="table-responsive">
                  <table className="table table-bordered table-hover mb-0">
                     <thead className="table-light">
                        <tr>
                           <th width="60">S.No</th>
                           <th width="120">Image</th>
                           <th>Heading</th>
                           <th>Button</th>
                           <th width="120">Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {viewSlider.map((items,index)=>{
                           return(
                              <tr key={index}>
                                 <td>{index+1}</td>
                                 <td><img src={sliderImage+items.image} className="img-fluid" width="100"/></td>
                                 <td>{items.heading}</td>
                                 <td>{items.button_txt}</td>
                                 <td><a href={`/slider/edit/${items._id}`} className="btn btn-sm btn-primary me-2">Edit</a><button onClick={()=>handleDelete(items._id)} className="btn btn-sm btn-danger">Delete</button></td>
                              </tr>
                           )
                        })}
                       
                       
                     </tbody>
                  </table>
               </div>
               }
              
            </div>
         </div>
      </div>
   </div>
</div>
  )
}
