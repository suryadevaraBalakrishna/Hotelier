'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Service() {
  const [service, setService] = useState([]);

  useEffect(() => {
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL +
          process.env.NEXT_PUBLIC_WEBSITE_SERVICE
      )
      .then((result) => {
        if (result.data._status === true) {
          setService(result.data._data);
        } else {
          setService([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (service.length === 0) {
    return null; // or return <div>Loading...</div>
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <h6 className="section-title text-center text-primary-text text-uppercase">
            Our Services
          </h6>

          <h1 className="mb-5">
            Explore Our{' '}
            <span className="text-primary-text text-uppercase">
              Services
            </span>
          </h1>
        </div>

        <div className="row g-4">
          {service.map((item, index) => (
            <div
              className="col-lg-4 col-md-6 wow fadeInUp"
              data-wow-delay={`${(index + 1) * 0.1}s`}
              key={item._id || index}
            >
              <a
                className="service-item rounded text-decoration-none"
                href="#"
              >
                <div className="service-icon bg-transparent border rounded p-1">
                  <div className="w-100 h-100 border rounded d-flex align-items-center justify-content-center">
                    <i className="fa fa-hotel fa-2x text-primary-text"></i>
                  </div>
                </div>

                <h5 className="mb-3 text-dark">
                  {item.heading}
                </h5>

                <p className="text-body mb-0">
                  {item.description}
                </p>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}