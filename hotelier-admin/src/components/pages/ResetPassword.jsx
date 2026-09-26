import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router';
import { toast } from 'react-toastify';

export default function ResetPassword() {

    let [submitStatus, setsubmitStatus] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    let handleSubmit = (event) => {
        event.preventDefault();
        setsubmitStatus(true);
        axios.post(import.meta.env.VITE_ADMIN_URL + import.meta.env.VITE_API_USER_RESET_PASSWORD, event.target, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((result) => {
            if (result.data._status == true) {
                toast.success(result.data._message);
                setsubmitStatus(true);
                navigate("/");
            } else {
                toast.error(result.data._message);
                setsubmitStatus(true);
            }
        })
            .catch((error) => {
                toast.error(error);
                setsubmitStatus(false);
            })

    }



  return (
   <section className="py-4">
   <div className="container">
      <div className="row justify-content-center align-items-center min-vh-100">
         <div className="col-lg-4 col-md-6">
            <div className="card shadow-lg border-0">
               <div className="card-body p-4">
                  <h5 className="text-center mb-4">Reset Password</h5>
                  <form autocomplete="off" onSubmit={handleSubmit}>
                     <div className="mb-3"><label className="form-label">New Password</label>
                     <input className="form-control" placeholder="Enter New Password" type="password" name="new_password"/>
                     </div>
                     <div className="mb-3"><label className="form-label">Confirm Password</label>
                     <input className="form-control" placeholder="Confirm Password" type="password" name="confirm_password"/>
                     </div>
                     <button type="submit"  disabled={submitStatus} className="btn btn-primary w-100">Submit</button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
  )
}
