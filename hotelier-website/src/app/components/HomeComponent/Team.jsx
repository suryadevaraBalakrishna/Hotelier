'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [imagePath, setImagePath] = useState('');

  useEffect(() => {
    axios
      .post(
        process.env.NEXT_PUBLIC_API_URL +
          process.env.NEXT_PUBLIC_WEBSITE_TEAM
      )
      .then((result) => {
        if (result.data._status === true) {
          setTeam(result.data._data);
          setImagePath(result.data._team_setting_image_path);
        } else {
          setTeam([]);
          setImagePath('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (team.length === 0) {
    return null; // or Loading...
  }

  return (
    <div className="container-xxl py-5">
      <div className="container">
        <div
          className="text-center wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <h6 className="section-title text-center text-primary-text text-uppercase">
            Our Team
          </h6>

          <h1 className="mb-5">
            Explore Our{' '}
            <span className="text-primary-text text-uppercase">
              Staffs
            </span>
          </h1>
        </div>

        <div className="row g-4">
          {team.map((item, index) => (
            <div
              key={item._id || index}
              className="col-lg-3 col-md-6 wow fadeInUp"
              data-wow-delay={`${0.1 * (index + 1)}s`}
            >
              <div className="rounded shadow overflow-hidden">
                <div className="position-relative">
                  <img
                    className="img-fluid"
                    src={`${imagePath}/${item.image}`}
                    alt={item.name}
                  />
                </div>

                <div className="text-center p-4 mt-3">
                  <h5 className="fw-bold mb-0">
                    {item.name}
                  </h5>

                  <small>
                    {item.designation}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}