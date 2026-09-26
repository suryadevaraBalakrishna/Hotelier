import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

export default function EditHotel() {

    const params=useParams();
     const id = params.id;

    const navigate = useNavigate();

    let [hotelData, setHotelData] = useState();
  

    useEffect(() => {
      if(id){
          axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_HOTEL_DETAIL,{id:id})
            .then((result) => {
                    if (result.data._status == true) {
                        setHotelData(result.data._data);
                     
                    } else {
                        toast.error(result.data._message);
                    }
                })
                .catch(() => {
                    toast.error('something went wrong');
                })
      }
        
    },[]);



    let updateHotel=((event)=>{
        event.preventDefault();
        let formData = new FormData(event.target);
        
        axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_HOTEL_UPDATE + '/' + id, formData)
          .then((result) => {
                if (result.data._status == true) {
                    toast.success('updated')
                    navigate('/hotel');
                } else {
                    toast.error(result.data._message);
                }
            })
            .catch(() => {
                toast.error('something went wrong');
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
                  Edit Hotel
                </h2>
              </div>
            </div>

            <div className="row tm-edit-product-row">
              <div className="col-xl-12 col-lg-12 col-md-12">

                <form className="tm-edit-product-form" onSubmit={updateHotel} enctype="multipart/form-data">

                  {/* Hotel Name */}
                  <div className="form-group mb-3">
                    <label htmlFor="name">Hotel Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Enter Hotel Name"
                      defaultValue={hotelData?.name}
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div className="form-group mb-3">
                    <label htmlFor="slug">Slug</label>
                    <input
                      id="slug"
                      name="slug"
                      type="text"
                      className="form-control"
                      placeholder="hotel-paradise"
                        defaultValue={hotelData?.slug}
                    />
                  </div>

                  {/* Location */}
                  <div className="form-group mb-3">
                    <label htmlFor="location">Location</label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      className="form-control"
                      placeholder="Noida, Delhi, Hyderabad..."
                      required
                        defaultValue={hotelData?.location}
                    />
                  </div>

                  {/* Description */}
                  <div className="form-group mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      rows="5"
                      className="form-control"
                      placeholder="Enter Hotel Description"
                      required
                      defaultValue={hotelData?.description}
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
                     
                    />
                    {hotelData?.image && <img src={hotelData.image} className="img-fluid w-50 mt-2" />}
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
                  {hotelData?.images && (
                    <div className="form-group mb-4">
                      <label>Current Gallery Images</label>
                      <div className="row">
                        {hotelData.images.map((img, index) => (
                          <div className="col-md-3 mb-2" key={index}>
                            <img src={img} className="img-fluid" alt={`Gallery ${index}`} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase"
                  >
                    Update Hotel
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
