import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Hotel() {
    let [Hotels,setHotels] = useState([])
    let [HotelImage,setHotelImage] = useState('')
    let [HotelLoading,setHotelLoading] = useState(false);

    useEffect(()=>{
       axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_HOTEL_VIEW)
       .then((result)=>{
        if(result.data._status==true){
            setHotels(result.data._data);
            setHotelImage(result.data._hotel_setting_image_path);
        }else{
            toast.error(result.data._message)
            setHotelImage();
        }
       }).catch((error)=>{
        toast.error(error.message)
       })
    },[HotelLoading])


    let handleDeleteHotel=((id)=>{
        console.log(id)
        if(window.confirm('Are you sure you want to delete this hotel?')){
            axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_HOTEL_DELETE,{id:id})
            .then((result)=>{
                if(result.data._status==true){
                    toast.success(result.data._message)
                    setHotelLoading(!HotelLoading);
                }else{
                    toast.error(result.data._message)
                    
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        }

    })




    // room
    let [Rooms,setRooms] = useState([])
    let [RoomImage,setRoomImage] = useState('');

    useEffect(()=>{
        axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_ROOM_VIEW)
        .then((result)=>{
            if(result.data._status==true){
              setRooms(result.data._data)
              setRoomImage(result.data._room_setting_image_path)
            }else{
                toast.error(result.data._message)
            }
        })
        .catch((error)=>{
            console.log(error)
        })

    },[])

  return (

  <div className="container mt-5">
    <div className="row tm-content-row">
        <div className="col-sm-12 col-md-12 col-lg-8 col-xl-8 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-products">
                <div className="tm-product-table-container">


                   {Hotels.length!=0 ?(
                       <table className="table table-hover tm-table-small tm-product-table">
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Image</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Hotels.map((hotel,index)=>{
                                return(
                                       <tr>
                                <td>{index + 1}</td>
                                <td className="tm-product-name">
                                    <a
                                        href={`/edit-hotel/${hotel._id}`}
                                        className="text-dark text-decoration-none"
                                        >{hotel.name}</a
                                    >
                                </td>
                                <td>{hotel.location}</td>
                                <td>
                                    <img
                                        className="img-fluid w-50"
                                        src={HotelImage + hotel.image}
                                        alt="Product Image"
                                    />
                                </td>
                                <td>
                                    <button className="tm-product-delete-link" onClick={()=>handleDeleteHotel(hotel._id)}>
                                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                                    </button>
                                </td>
                            </tr>
                          
                                )
                            })}

                         
                        </tbody>
                    </table>
                ):(
                        <div className="text-center">
                            <h3>No Hotels Found</h3>
                        </div>)
                   }
                  


                </div>
                <a href="/add-hotel" className="btn btn-primary btn-block text-uppercase mx-3">Add new hotel</a>
            </div>
        </div>
        <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4 tm-block-col">
            <div className="tm-bg-primary-dark tm-block tm-block-product-categories">
                <h2 className="tm-block-title">Rooms</h2>
                <div className="tm-product-table-container">

                    {Rooms.length!=0 ?(
                         <table className="table tm-table-small tm-product-table">
                        <tbody>
                           {Rooms.map((items,index)=>{
                                return(
                                      <tr>
                                <td className="tm-product-name">
                                    <a
                                        href={`/edit-room/${items._id}`}
                                        className="text-dark text-decoration-none"
                                        >{items.name}</a>
                                </td>
                                <td className="text-center">
                                    <button className="tm-product-delete-link">
                                        <i className="far fa-trash-alt tm-product-delete-icon"></i>
                                    </button>
                                </td>
                            </tr>
                                )
                           })}
                        </tbody>
                    </table>
                    ):(
                        <div className="text-center">
                            <h3>No Rooms Found</h3>
                        </div>)
                   }
                   
                   
                </div>
                <a href="/add-room" className="btn btn-primary btn-block text-uppercase mx-3">Add new room</a>
            </div>
        </div>
    </div>
 </div>


 
  )
}
