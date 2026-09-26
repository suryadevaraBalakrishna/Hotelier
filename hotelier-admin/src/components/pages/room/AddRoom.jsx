import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AddRoom() {

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



  let handleAddRoom=((event)=>{
    event.preventDefault();
    let formData = new FormData(event.target);
    
    axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_ROOM_CREATE, formData)
    .then((result)=>{
      if(result.data._status==true){
        toast.success(result.data._message)
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
                  Add Room
                </h2>
              </div>
            </div>

            <div className="row tm-edit-product-row">
              <div className="col-xl-12 col-lg-12 col-md-12">

                <form
                  className="tm-edit-product-form"
                  encType="multipart/form-data"
                  onSubmit={handleAddRoom}
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
                          <option value={hotel._id}>{hotel.name}</option>
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
                      defaultValue={2}
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
                      required
                    ></textarea>
                  </div>

                  {/* Cover Image */}
                  <div className="form-group mb-3">
                    <label htmlFor="image">Cover Image</label>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="form-control"
                      required
                    />
                  </div>

                  {/* Gallery Images */}
                  <div className="form-group mb-4">
                    <label htmlFor="images">Gallery Images</label>
                    <input
                      id="images"
                      name="images"
                      type="file"
                      className="form-control"
                      multiple
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase"
                  >
                    Add Room
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
