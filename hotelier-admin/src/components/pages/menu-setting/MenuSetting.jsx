import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function MenuSetting() {
 let [menu,setmenu]=useState([])
  const [createStatus, setCreateStatus] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(()=>{
   axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_MENU_SETTING_VIEW)
   .then((result)=>{
      if(result.data._status===true){
        setmenu(result.data._data)
        console.log(result.data._data);
      }else{
        setmenu([])
        console.log(result.data._message)
      }
    }).catch((error)=>{
        toast.error("Something went wrong");
        console.log(error);
    })
  },[createStatus,deleteStatus])



  let handlesubmit=(event)=>{
    event.preventDefault();
    let formdata=new FormData();
    formdata.append('name',event.target.name.value);
    formdata.append('slug',event.target.slug.value);
    formdata.append('link',event.target.link.value);
    formdata.append('parentId',event.target.parentId.value);
    formdata.append('order',event.target.order.value);
    formdata.append('status',event.target.status.value);

    axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_MENU_SETTING_CREATE,formdata)
    .then((result)=>{
      if(result.data._status===true){
        setCreateStatus(true);
        toast.success(result.data._message);
      }else{
        setCreateStatus(false);
        toast.error(result.data._message);
      }
    }).catch((error)=>{
        setCreateStatus(false);
        toast.error("Something went wrong");
        console.log(error);
    })
  }
  


  let handleDelete=(id)=>{
    if(window.confirm("Are you sure you want to delete this menu?")){
      axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_MENU_SETTING_DELETE,{id:id})   
        .then((result)=>{
            if(result.data._status===true){  
                setDeleteStatus(true);
                toast.success(result.data._message);
            }else{
                setDeleteStatus(false);
                toast.error(result.data._message);
            }   
        }).catch((error)=>{
            setDeleteStatus(false);
            toast.error("Something went wrong");
            console.log(error);
        })
    }
}


    return (
        <div className="container my-5">

            {/* Page Title */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Menu Management</h4>
            </div>

            <div className="row">

                {/* LEFT SIDE - CREATE MENU FORM */}
                <div className="col-md-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <h6 className="mb-0">Add / Edit Menu</h6>
                        </div>

                        <div className="card-body">
                            <form onSubmit={handlesubmit}>

                                {/* Menu Name */}
                                <div className="mb-3">
                                    <label className="form-label">Menu Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter menu name"
                                    />
                                </div>

                                {/* Slug */}
                                <div className="mb-3">
                                    <label className="form-label">Slug</label>
                                    <input
                                        type="text"
                                        name="slug"
                                        className="form-control"
                                        placeholder="enter-slug"
                                    />
                                </div>

                                {/* Link */}
                                <div className="mb-3">
                                    <label className="form-label">Link</label>
                                    <input
                                        type="text"
                                        name="link"
                                        className="form-control"
                                        placeholder="/about"
                                    />
                                </div>

                                {/* Parent Menu */}
                                <div className="mb-3">
                                    <label className="form-label">Parent Menu</label>
                                    <select name="parentId" className="form-select">
                                        <option value="">-- Main Menu --</option>
                                        {menu && menu.length > 0 && menu.map((item) => (
                                            <option key={item._id} value={item._id}>{item.name}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Order */}
                                <div className="mb-3">
                                    <label className="form-label">Order</label>
                                    <input
                                        type="number"
                                        name="order"
                                        className="form-control"
                                        placeholder="0"
                                    />
                                </div>

                                {/* Status */}
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select name="status" className="form-select">
                                        <option value="true">Active</option>
                                        <option value="false">Inactive</option>
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <div className="text-end">
                                    <button type="submit" className="btn btn-success">
                                        <i className="fas fa-save me-2"></i>
                                        Save Menu
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE - MENU LIST TABLE */}
                <div className="col-md-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-dark text-white">
                            <h6 className="mb-0">Menu List</h6>
                        </div>

                        <div className="card-body p-0">
                            {menu && menu.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-bordered table-hover mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Sno.</th>
                                            <th>Name</th>
                                            <th>Slug</th>
                                            <th>Parent</th>
                                            <th>Order</th>
                                            <th>Status</th>
                                            <th width="120">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {menu.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.slug}</td>
                                                <td>{item.parentId?.name || 'Main'}</td>
                                                <td>{item.order}</td>
                                                <td>
                                                    <span className={`badge ${item.status ? 'bg-success' : 'bg-danger'}`}>
                                                        {item.status ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button className="btn btn-sm btn-warning me-1">
                                                        <a href={`/menu-setting/edit/${item._id}`} className="text-white">
                                                            <i className="fas fa-edit"></i>
                                                        </a>
                                                    </button>
                                                    <button className="btn btn-sm btn-danger" onClick={()=>handleDelete(item._id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            ) : (
                                <div className="text-center p-4">
                                    <h6 className="mb-0">No menu items found.</h6>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
