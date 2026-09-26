import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Order() {

  const [booking, setBooking] = useState([]);

  useEffect(() => {

    axios.post(
      import.meta.env.VITE_ADMIN_URL +
      import.meta.env.VITE_API_BOOKING_VIEW
    )
      .then((result) => {

        console.log("Booking Response:", result.data);

        if (result.data._status === true) {
          setBooking(result.data._data);
        } else {
          console.log(result.data._message);
        }

      })
      .catch((error) => {
        console.log("Booking Error:", error);
      });

  }, []);

  return (
    <div className="container-fluid mt-5 px-4">

      <div className="row tm-content-row">

        <div className="col-12 tm-block-col">

          <div className="tm-bg-primary-dark tm-block tm-block-h-auto">

            <h2 className="tm-block-title mb-4">
              Orders Management
            </h2>

            <div className="card shadow-lg border-0">

              <div className="card-header bg-gradient p-4">

                <h5 className="mb-0 fs-4">
                  Order List ({booking.length})
                </h5>

              </div>

              <div className="card-body p-4">

                <div className="table-responsive">

                  <table className="table table-hover align-middle mb-0 table-sm">

                    <thead className="table-dark">

                      <tr>
                        <th className="text-center">Sno</th>
                        <th>Order ID</th>
                        <th>Customer</th>
                        <th>Hotel</th>
                        <th>Room</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th className="text-end">Amount</th>
                        <th className="text-center">Status</th>
                      </tr>

                    </thead>

                    <tbody>

                      {booking.length > 0 ? (

                        booking.map((item, index) => (

                          <tr
                            className="border-bottom"
                            key={item._id}
                          >

                            <td className="text-center fw-bold">
                              {index + 1}
                            </td>

                            <td>
                              <span className="badge bg-info text-dark">
                                {item.order_id || "N/A"}
                              </span>
                            </td>

                            <td className="fw-500">
                              {item.user_id?.name || item.guest_name}
                            </td>

                            <td>
                              {item.hotel_id?.name || "N/A"}
                            </td>

                            <td>
                              {item.room_id?.name || "N/A"}
                            </td>

                            <td>
                              {new Date(
                                item.check_in
                              ).toLocaleDateString()}
                            </td>

                            <td>
                              {new Date(
                                item.check_out
                              ).toLocaleDateString()}
                            </td>

                            <td className="text-end fw-bold">
                              ₹{item.total_amount}
                            </td>

                            <td className="text-center">

                              <span
                                className={
                                  item.status === "confirmed"
                                    ? "badge bg-success"
                                    : item.status === "pending"
                                    ? "badge bg-warning text-dark"
                                    : item.status === "cancelled"
                                    ? "badge bg-danger"
                                    : "badge bg-secondary"
                                }
                              >
                                {item.status}
                              </span>

                            </td>

                          </tr>

                        ))

                      ) : (

                        <tr>

                          <td
                            colSpan="9"
                            className="text-center py-4"
                          >
                            No bookings found
                          </td>

                        </tr>

                      )}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}