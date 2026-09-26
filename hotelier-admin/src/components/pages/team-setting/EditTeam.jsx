import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify';


export default function EditTeam() {
    let [Team,setTeam]=useState([]);

      const params = useParams();
    const id = params.id;
    const [imagepath, setimagepath] = useState('');

        const navigate=useNavigate();

       useEffect(() => {
        if (id) {
            axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_TEAM_DETAIL, { id: id })
                .then((result) => {
                    if (result.data._status == true) {
                        setTeam(result.data._data);
                        setimagepath(result.data._team_setting_image_path);
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
      formData.append('name', event.target.name.value);
    formData.append('designation', event.target.designation.value);
    formData.append('image', event.target.image.files[0]);

      axios.post(import.meta.env.VITE_ADMIN_URL+ import.meta.env.VITE_API_TEAM_UPDATE + '/' + id,formData)
      .then((result)=>{
        if(result.data._status==true){
           toast.success('updated')
           navigate('/add-team');
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
                            <h6 className="mb-0">Edit Team</h6>
                        </div>

                        <div className="card-body">
                            <form   encType="multipart/form-data" onSubmit={handleUpdate}>

                           
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Name" defaultValue={Team?.name}   name='name'/>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Designation</label>
                                    <input type='text' className="form-control"  placeholder="Enter designation " defaultValue={Team?.designation}  name='designation'></input>
                                </div>

                           

                                <div className="mb-3">
                                    <label className="form-label"> Image</label>
                                    <input type="file" className="form-control" name='image' />
                                    <img className='img-fluid' src={imagepath+Team?.image}/>
                                </div>

                                <div className="text-end">
                                    <button type="submit" className="btn btn-success">
                                        Update Team
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
