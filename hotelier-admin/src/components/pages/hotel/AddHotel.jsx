import React from "react";
import { useState,useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function AddHotel() {

    let handleAddHotel = (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);

        axios.post(import.meta.env.VITE_ADMIN_URL+import.meta.env.VITE_API_HOTEL_CREATE, formData)
        .then((result) => {
            if (result.data._status === true) {
                toast.success(result.data._message);
                event.target.reset();
            } else {
                toast.error(result.data._message);
            }
        })
        .catch((error) => {
            toast.error(error.message);
        });
    }

  return (
    <div className="container tm-mt-big tm-mb-big">
      <div className="row">
        <div className="col-xl-9 col-lg-10 col-md-12 col-sm-12 mx-auto">
          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">

            <div className="row">
              <div className="col-12">
                <h2 className="tm-block-title d-inline-block">
                  Add Hotel
                </h2>
              </div>
            </div>

            <div className="row tm-edit-product-row">
              <div className="col-xl-12 col-lg-12 col-md-12">

                <form className="tm-edit-product-form" enctype="multipart/form-data" onSubmit={handleAddHotel}>

                  {/* Hotel Name */}
                  <div className="form-group mb-3">
                    <label htmlFor="name">Hotel Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Enter Hotel Name"
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
                    Add Hotel
                  </button>

                </form>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}