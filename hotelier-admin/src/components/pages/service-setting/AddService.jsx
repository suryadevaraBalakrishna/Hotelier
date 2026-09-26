import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';


export default function AddService() {

       let [Service,setService]=useState([]);
   
      const [createStatus, setcreateStatus] = useState(false);
       const [deleteStatus, setdeleteStatus] = useState(false);


    useEffect(()=>{
      axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_SERVICE_VIEW)
      .then((result)=>{
          if(result.data._status==true){
             setService(result.data._data);
          }else{
             setService([]);
           
          }
      }).catch((error)=>{
        console.log(error);
      })
    },[createStatus,deleteStatus])


    let handleSubmit=(event)=>{
        event.preventDefault();
        let formData=new FormData();
        formData.append('heading', event.target.heading.value);
    formData.append('description', event.target.description.value);
   
    axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_SERVICE_CREATE,formData)
     .then((result)=>{
      if(result.data._status==true){
        toast.success(result.data._message);
        setcreateStatus(!createStatus);
        event.target.reset();
      }else{
        toast.error(result.data._message);
      }
    })
    .catch(()=>{
      toast.error(result.data._message)
    })
     
    }


     let handleDelete = ((id) => {
    if (window.confirm("Are you sure to delete?")) {
      axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_SERVICE_DELETE, {
        id: id
      }).then((result) => {
        if (result.data._status == true) {
          toast.success(result.data._message);
          setdeleteStatus(!deleteStatus);
        } else {
          toast.error(response.data._message);
        }
      }).catch((error) => {
        toast.error(error._message);
      })

    }
  })

    return (
        <div className="container my-4">

            <div className="row">

                {/* Left Side - Add Slider Form */}
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h6 className="mb-0">Add Service</h6>
                        </div>

                        <div className="card-body">
                            <form encType='multipart/form-data' onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Heading</label>
                                    <input type="text" className="form-control" placeholder="Enter Name" name='heading' />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea className="form-control" rows="3" placeholder="Enter description" name='description'></textarea>
                                </div>



                                <div className="text-end">
                                    <button type="submit" className="btn btn-success">
                                        Save
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>


                {/* Right Side - Slider Table */}
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white">
                            <h6 className="mb-0">Service List</h6>
                        </div>

                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th width="60">S.No</th>

                                            <th>Heading</th>
                                            <th>Description</th>
                                            <th width="120">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                    
                                           {Service.map((items,index)=>{
                                              return(
                                                 <tr>
                                            <td>{index+1}</td>
                                            <td>{items.heading}</td>
                                            <td>{items.description}</td>
                                            <td><a href={`/service/edit/${items._id}`} class="btn btn-sm btn-primary me-2">Edit</a><button onClick={()=>handleDelete(items._id)} class="btn btn-sm btn-danger">Delete</button></td>
                                        </tr>
                                              )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}
