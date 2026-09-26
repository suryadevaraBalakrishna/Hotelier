import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

export default function Account() {

    let [user,setuser]=useState();
  
      let [UpdateStatus, setUpdateStatus] = useState(false);

    let [profileDetails, setprofileDetails] = useState('');


    let usertoken = useSelector((state) => {
        return state.login.admin_token;
    })


       useEffect(() => {
        axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_USER_VIEW, {}, {
            headers: {
                'Authorization': `Bearer ${usertoken}`
            }
        }).then((result) => {
            if (result.data._status == true) {
                setprofileDetails(result.data._data)
            } else {
                toast.error(result.data._message);
                setprofileDetails('')
            }
        })
            .catch(() => {
                toast.error('something went wrong');
            })
    }, [UpdateStatus])



    



    useEffect(()=>{
        axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_USER_VIEW_ALL)
        .then((result)=>{
            if(result.data._status==true){
                setuser(result.data._data);
          
            }else{
                setuser('');
              
            }
        }).catch((error)=>{
            console.log(error);
        })
    },[])




      let handleUpdate = (event) => {
        event.preventDefault();
        let formData = new FormData();

        formData.append("name", event.target.name.value);
        formData.append("email", event.target.email.value);
        formData.append("mobile_number", event.target.mobile_number.value);
        let file = event.target.image.files[0];
        if (file) {
            formData.append("image", file);
        }

        axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_USER_UPDATE_PROFILE, formData, {
            headers: {
                'Authorization': `Bearer ${usertoken}`
            }
        })
            .then((result) => {
                if (result.data._status == true) {
                    toast.success(result.data._message);
                      setUpdateStatus(!UpdateStatus);
                } else {
                    toast.error(result.data._message);
                      setUpdateStatus(!UpdateStatus);
                }
            })
            .catch(() => {
                setUpdateStatus(!UpdateStatus);
                toast.error('something went wrong');
            })

    }





  return (
   <div class="container mt-5">
   <div class="row tm-content-row">
      <div class="col-12 tm-block-col">
         <div class="tm-bg-primary-dark tm-block tm-block-h-auto">
            <h2 class="tm-block-title">List of Accounts</h2>
            <div class="container mt-5">
               <div class="card shadow-sm">
                  <div class="card-body">
                     <h4 class="mb-4">User List</h4>
                     <div class="table-responsive">
                        <table class="table table-bordered align-middle">
                           <thead class="table-dark">
                              <tr>
                                 <th>sno</th>
                                 <th>Image</th>
                                 <th>Name</th>
                                 <th>Email</th>
                                 <th>Phone</th>
                                 <th>Role</th>
                              </tr>
                           </thead>
                           <tbody>

                            {user && user.map((items,index)=>{
                               return(
                                   
                              <tr>
                                 <td>{index+1}</td>
                                 <td><img alt="user" width="50" height="50" class="rounded-circle" src={items?.image} /></td>
                                 <td>{items.name}</td>
                                 <td>{items.email}</td>
                                 <td>{items.mobile_number}</td>
                                 <td><span class="badge bg-primary">{items.role_type}</span></td>
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
   </div>
   <form class="row tm-content-row g-3" enctype="multipart/form-data" onSubmit={handleUpdate}>
      <div class="col-lg-4 mb-4">
         <div class="tm-bg-primary-dark tm-block text-center">
            <h2 class="tm-block-title">Change Avatar</h2>
            <div class="mb-3 position-relative"><img alt="Avatar" class="img-fluid rounded mb-3" src={profileDetails?.image}/></div>
            <input class="form-control" type="file" name="image"/>
         </div>
      </div>
      <div class="col-lg-8">
         <div class="tm-bg-primary-dark tm-block">
            <h2 class="tm-block-title">Account Settings</h2>
            <div class="row g-3">
               <div class="col-md-6"><label class="form-label">Name</label>
              <input
                                    name="name"
                                    type="text"
                                    defaultValue={profileDetails?.name}
                                    className="form-control"
                                />
               </div>
               <div class="col-md-6"><label class="form-label">Email</label>
                <input
                                    name="email"
                                    type="email"
                                    defaultValue={profileDetails?.email}
                                    className="form-control"
                                />
               </div>
               <div class="col-md-6"><label class="form-label">Phone</label>
           <input
                                    name="mobile_number"
                                    type="tel"
                                    defaultValue={profileDetails?.mobile_number}
                                    className="form-control"
                                />
               </div>
               <div class="col-md-6 d-flex align-items-end">
                <button type="submit" class="btn btn-primary w-100">Update Profile</button>
                </div>
            </div>
         </div>
      </div>
   </form>
</div>
  )
}
