import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router'
import { toast } from 'react-toastify';

export default function EditSetting() {

    const params=useParams();
    const id=params.id;

    let [menu,setmenu]=useState();

    let navigate=useNavigate();

    let [allMenu,setallMenu]=useState([]);

    const [parentId, setParentId] = useState("");

    useEffect(()=>{
        if(id){
    axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_MENU_SETTING_VIEW,{id:id})
    .then((result)=>{
        if(result.data._status==true){
            setmenu(result.data._data);
            console.log(result.data._data);
        }else{
          console.log(result.data._message)
        }
    }).catch((error)=>{
        console.error("Error fetching menu data:", error);
    });
  }

    },[])


    //all menu fetching
      useEffect(()=>{
   axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_MENU_SETTING_VIEW)
   .then((result)=>{
      if(result.data._status===true){
        setallMenu(result.data._data)
        console.log(result.data._data);
      }else{
        setallMenu([])
        console.log(result.data._message)
      }
    }).catch((error)=>{
        toast.error("Something went wrong");
        console.log(error);
    })
  },[]) 


//  handle update
let handleUpdate=(event)=>{
    event.preventDefault();
    let formdata=new FormData();    
  
    formdata.append('name',event.target.name.value);
    formdata.append('slug',event.target.slug.value);
    formdata.append('link',event.target.link.value);
    formdata.append('parentId',event.target.parentId.value);
    formdata.append('order',event.target.order.value);  
    axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_MENU_SETTING_UPDATE + "/" + id,formdata)
    .then((result)=>{
        if(result.data._status==true){
            toast.success(result.data._message);
            navigate('/menu-setting');
        }else{            
             toast.error(result.data._message);  
        }
    }).catch((error)=>{
         toast.error("Something went wrong");
        console.log(error);
    })
}




useEffect(() => {
    if (menu?.parentId?._id) {
        setParentId(menu.parentId._id);
    }
}, [menu]);





  return (
           <div class="container my-5">


            <div class="row">

                <div class="col-md-6 offset-md-3">
                    <div class="card shadow-sm">
                        <div class="card-header bg-primary text-white">
                            <h6 class="mb-0">Edit Menu</h6>
                        </div>

                        <div class="card-body">
                            <form onSubmit={handleUpdate}>


                                <div class="mb-3">
                                    <label class="form-label">Menu Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        class="form-control"
                                        placeholder="Enter menu name"
                                        defaultValue={menu?.name}
                                    />
                                </div>


                                <div class="mb-3">
                                    <label class="form-label">Slug</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        class="form-control"
                                        placeholder="enter-slug"
                                        defaultValue={menu?.slug}
                                    />
                                </div>


                                <div class="mb-3">
                                    <label class="form-label">Link</label>
                                    <input
                                        type="text"
                                        name="link"
                                        class="form-control"
                                        placeholder="/about"
                                        defaultValue={menu?.link}
                                    />
                                </div>


                              <div className="mb-3">
                                  <label className="form-label">Parent Menu</label>

                                  <select
                                      name="parentId"
                                      className="form-select"
                                      value={parentId}
                                      onChange={(e) => setParentId(e.target.value)}
                                  >
                                      <option value="">-- Main Menu --</option>

                                      {allMenu.map((item) => (
                                          <option key={item._id} value={item._id}>
                                              {item.name}
                                          </option>
                                      ))}
                                  </select>
                              </div>


                                <div class="mb-3">
                                    <label class="form-label">Order</label>
                                    <input
                                        type="number"
                                        name="order"
                                        class="form-control"
                                        placeholder="0"
                                        defaultValue={menu?.order}
                                    />
                                </div>


                               


                                <div class="text-end">
                                    <button type="submit" class="btn btn-success me-2">
                                        <i class="fas fa-save me-2"></i>
                                        Update Menu
                                    </button>

                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
  )
}
