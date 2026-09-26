import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify';

export default function EditRoom() {

  const params=useParams();
  const navigate=useNavigate();
  const id = params.id;

  let [RoomDetail, setRoomDetail] = useState([]);
  let [imagePath, setImagePath] = useState('');

  useEffect(()=>{
     if(id){
        axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_ROOM_DETAIL,{id:id})
        .then((result)=>{
           if(result.data._status==true){
              setRoomDetail(result.data._data);
              setImagePath(result.data._room_setting_image_path);
           }else{
            toast.error(result.data._message)
           }
        })
     }
  },[])



  // Select Hotel

  let [hotels, sethotels] = useState([]);

  useEffect(() => {
    axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_HOTEL_VIEW)
      .then((result) => {
        if (result.data._status == true) {
          sethotels(result.data._data);
        } else {
          toast.error(result.data._message)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])




  let handleUpdateRoom=((event)=>{
    event.preventDefault();
    let formData = new FormData(event.target);

    // if(event.target.image.files.length > 0){
    //   formData.append('image', event.target.image.files[0]);
    // }

    // if(event.target.images.files.length > 0){
    //   for (let i = 0; i < event.target.images.files.length; i++) {
    //     formData.append('images', event.target.images.files[i]);
    //   }
    // }
    
    axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_ROOM_UPDATE+'/' + id, formData)
    .then((result)=>{
      if(result.data._status==true){
        toast.success(result.data._message)
        navigate('/hotel')
      }else{
        toast.error(result.data._message)
      }
    }).catch((error)=>{
      console.log(error)
    })
  })

  




  return (
     <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">

            <div className="row">
              <div className="col-12">
                <h2 className="tm-block-title d-inline-block">
                  Edit Room
                </h2>
              </div>
            </div>

            <div className="row tm-edit-product-row">
              <div className="col-xl-12 col-lg-12 col-md-12">

                <form
                  className="tm-edit-product-form"
                  encType="multipart/form-data"
                  onSubmit={handleUpdateRoom}
                >

                  {/* Room Name */}
                  <div className="form-group mb-3">
                    <label htmlFor="name">Room Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Enter Room Name"
                      defaultValue={RoomDetail.name}
                      required
                    />
                  </div>

                  {/* Select Hotel */}
                  <div className="form-group mb-3">
                    <label htmlFor="hotel_id">Select Hotel</label>
                    <select
                      id="hotel_id"
                      name="hotel_id"
                      className="form-control"
                      required
                      
                    >
                      <option value="">Select Hotel</option>
                       
                        {hotels.map((hotel) => {
                        return (
                          <option value={hotel._id} selected={hotel._id === RoomDetail.hotel_id}>
                            {hotel.name}
                          </option>
                        )
                      })}

                    </select>
                  </div>

                  {/* Price */}
                  <div className="form-group mb-3">
                    <label htmlFor="price">Price Per Night</label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      className="form-control"
                      placeholder="Enter Price"
                      defaultValue={RoomDetail.price}
                      required
                    />
                  </div>

                  {/* Total Rooms */}
                  <div className="form-group mb-3">
                    <label htmlFor="totalRooms">Total Rooms</label>
                    <input
                      id="totalRooms"
                      name="totalRooms"
                      type="number"
                      className="form-control"
                      placeholder="Enter Total Rooms"
                      required
                      defaultValue={RoomDetail.totalRooms}
                    />
                  </div>

                  {/* Maximum Guests */}
                  <div className="form-group mb-3">
                    <label htmlFor="maxGuests">Maximum Guests</label>
                    <input
                      id="maxGuests"
                      name="maxGuests"
                      type="number"
                      className="form-control"
                      defaultValue={RoomDetail.maxGuests}
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      className="form-control"
                      placeholder="Enter Room Description"
                      defaultValue={RoomDetail.description}
                      required
                    ></textarea>
                  </div>

                  {/* Cover Image */}
                  <div className="form-group mb-3">
                    <img src={imagePath+RoomDetail.image} className="img-fluid w-25 mb-3" />
                    <div>
                    <label htmlFor="image">Cover Image</label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="form-control"
                  
                    />
                    </div>
                  </div>

                  {/* Gallery Images */}
                  <div className="form-group mb-4">
                    {RoomDetail.images && RoomDetail.images.map((img, index) => {
                      return (
                        <img src={imagePath+img} className="img-fluid w-25 mb-3 mx-2" key={index} />
                      )
                    })}
                    <div>
                    <label htmlFor="images">Gallery Images</label>
                    <input
                      id="images"
                      name="images"
                      type="file"
                      className="form-control"
                      multiple
                    />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase"
                  >
                    Update Room
                  </button>

                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
