'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Counter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const step = Math.ceil(target / 100);

    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;

        if (next >= target) {
          clearInterval(interval);
          return target;
        }

        return next;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [target]);

  return <>{count}+</>;
}

export default function About() {
  const [aboutData, setAboutData] = useState(null);
 
  useEffect(() => {
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL +
          process.env.NEXT_PUBLIC_WEBSITE_ABOUT
      )
      .then((result) => {
        if (result.data._status === true) {
          setAboutData(result.data._data);
         
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!aboutData) {
    return null; // or return <div>Loading...</div>
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <h6 className="section-title text-start text-primary-text text-uppercase">
              {aboutData.sub_heading}
            </h6>

            <h1 className="mb-4">
              {aboutData.heading}
            </h1>

            <p className="mb-4">
              {aboutData.description}
            </p>

            <div className="row g-3 pb-4">
              <div className="col-sm-4">
                <div className="border rounded p-1">
                  <div className="border rounded text-center p-4">
                    <i className="fa fa-hotel fa-2x text-primary-text mb-2"></i>
                    <h2 className="mb-1">
                      <Counter target={1234} />
                    </h2>
                    <p className="mb-0">Rooms</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="border rounded p-1">
                  <div className="border rounded text-center p-4">
                    <i className="fa fa-users-cog fa-2x text-primary-text mb-2"></i>
                    <h2 className="mb-1">
                      <Counter target={850} />
                    </h2>
                    <p className="mb-0">Staffs</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-4">
                <div className="border rounded p-1">
                  <div className="border rounded text-center p-4">
                    <i className="fa fa-users fa-2x text-primary-text mb-2"></i>
                    <h2 className="mb-1">
                      <Counter target={5000} />
                    </h2>
                    <p className="mb-0">Clients</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              className="btn-primary-btn py-3 px-5 mt-2"
              href={aboutData.button_link}
            >
              {aboutData.button_txt}
            </a>
          </div>

          <div className="col-lg-6">
            <img
              className="w-100 rounded"
              src={`${aboutData.image}`}
              alt={aboutData.heading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}