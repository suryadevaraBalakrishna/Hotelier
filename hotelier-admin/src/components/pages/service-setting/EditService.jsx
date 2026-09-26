import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify';


export default function EditService() {

        let [service,setservice]=useState([]);

      const params = useParams();
    const id = params.id;
   
        const navigate=useNavigate();

       useEffect(() => {
        if (id) {
            axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_SERVICE_DETAIL, { id: id })
                .then((result) => {
                    if (result.data._status == true) {
                        setservice(result.data._data);
                     
                    } else {
                        toast.error(result.data._message);
                    }
                })
                .catch(() => {
                    toast.error('something went wrong');
                })
        }

    })


    let handleUpdate=(event)=>{
     event.preventDefault();
     let formData=new FormData();
       formData.append('heading', event.target.heading.value);
    formData.append('description', event.target.description.value);
   

      axios.post(import.meta.env.VITE_ADMIN_URL+ import.meta.env.VITE_API_SERVICE_UPDATE + '/' + id,formData)
      .then((result)=>{
        if(result.data._status==true){
           toast.success('updated')
           navigate('/add-service');
         }else{
             toast.error(result.data._message);
        }
      })
      .catch(()=>{
         toast.error(result.data._message);
      })
      
    }

  return (
  <div className="container my-4">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h6 className="mb-0">Edit Service</h6>
                        </div>

                        <div className="card-body">
                            <form   encType="multipart/form-data" onSubmit={handleUpdate}>

                                <div className="mb-3">
                                    <label className="form-label">Heading</label>
                                    <input type="text" className="form-control" placeholder="Enter Name" defaultValue={service?.heading}    name='heading'/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <input type='text' className="form-control"  placeholder="Enter designation " defaultValue={service?.description}  name='description'></input>
                                </div>

                           

                                

                                <div className="text-end">
                                    <button type="submit" className="btn btn-success">
                                        Update Service
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
  )
}
