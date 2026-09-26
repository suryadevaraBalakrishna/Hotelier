import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';


export default function AddTeam() {

    let [Team,setTeam]=useState([]);
    let [imagePath,setimagePath]=useState();
      const [createStatus, setcreateStatus] = useState(false);
       const [deleteStatus, setdeleteStatus] = useState(false);


    useEffect(()=>{
      axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_TEAM_VIEW)
      .then((result)=>{
          if(result.data._status==true){
             setTeam(result.data._data);
             setimagePath(result.data._team_setting_image_path);
          }else{
             setTeam([]);
             setimagePath();
          }
      }).catch((error)=>{
        console.log(error);
      })
    },[createStatus,deleteStatus])


    let handleSubmit=(event)=>{
        event.preventDefault();
        let formData=new FormData();
        formData.append('name', event.target.name.value);
    formData.append('designation', event.target.designation.value);
    formData.append('image', event.target.image.files[0]);

    axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_TEAM_CREATE,formData)
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
      axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_TEAM_DELETE, {
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
                            <h6 className="mb-0">Add Team</h6>
                        </div>

                        <div className="card-body">
                            <form encType='multipart/form-data' onSubmit={handleSubmit}>



                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Name" name='name' />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Designation</label>
                                    <textarea className="form-control" rows="3" placeholder="Enter description" name='designation'></textarea>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    <input type="file" className="form-control" name='image' />
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
                            <h6 className="mb-0">Team List</h6>
                        </div>

                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table table-bordered table-hover mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th width="60">S.No</th>
                                            <th width="120">Image</th>
                                            <th>Name</th>
                                            <th>Designation</th>
                                            <th width="120">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Team.map((items,index)=>{
                                              return(
                                                 <tr>
                                            <td>{index+1}</td>
                                            <td><img class="img-fluid" width="100" src={imagePath+items.image} /></td>
                                            <td>{items.name}</td>
                                            <td>{items.designation}</td>
                                            <td><a href={`/team/edit/${items._id}`} class="btn btn-sm btn-primary me-2">Edit</a><button onClick={()=>handleDelete(items._id)} class="btn btn-sm btn-danger">Delete</button></td>
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
