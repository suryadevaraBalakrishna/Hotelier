import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../slice/loginSlice';

export default function Header() {
   let dispatch=useDispatch();

    const navigate=useNavigate();


      let logout=()=>{
        dispatch(logOut());
        navigate('/');
    }

  return (
      <nav className="navbar navbar-expand-xl">
            <div className="container h-100">
                <a className="navbar-brand" href="/dashboard">
                    <h1 className="tm-site-title mb-0">Admin</h1>
                </a>
                <button className="navbar-toggler ml-auto mr-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars tm-nav-icon"></i>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto h-100">
                        <li className="nav-item">
                            <a className="nav-link" href="/dashboard">
                                <i className="fas fa-tachometer-alt"></i>
                                Dashboard
                            </a>
                        </li>
                        <li className="nav-item dropdown">

                        
<a
  className="nav-link dropdown-toggle "
  href="#"
  id="navbarDropdown1"
  role="button"
  data-bs-toggle="dropdown"
  aria-expanded="false"
  onClick={(e) => e.preventDefault()}
>
                                <i className="far fa-file-alt"></i>
                                <span>
                                    Components <i className="fas fa-angle-down"></i>
                                </span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown1">
                                <a className="dropdown-item" href="/add-slider">Slider</a>
                                  <a className="dropdown-item" href="/add-service">Service</a>
                              <a className="dropdown-item" href="/about">About us</a>
                               <a className="dropdown-item" href="/add-team">Team</a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/hotel">
                                <i className="fas fa-shopping-cart"></i>
                                Hotel
                            </a>
                        </li>

                         <li className="nav-item">
                            <a className="nav-link" href="/orders">
                                <i className="fas fa-shopping-cart"></i>
                                Orders
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="accounts">
                                <i className="far fa-user"></i>
                                Accounts
                            </a>
                        </li>
                        <li className="nav-item dropdown">
                             <a
  className="nav-link dropdown-toggle"
  href="#"
  id="navbarDropdown2"
  role="button"
  data-bs-toggle="dropdown"
  aria-expanded="false"
  onClick={(e) => e.preventDefault()}
>
                                <i className="fas fa-cog"></i>
                                <span>
                                    Settings <i className="fas fa-angle-down"></i>
                                </span>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
                                <a className="dropdown-item" href="/website-setting">Website Setting</a>
                                <a className="dropdown-item" href="/menu-setting">Menu Setting</a>
                                 <a className="dropdown-item" href="/newsletter-setting">Newsletter Setting</a>
                            </div>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link d-block" >
                                Admin, <b onClick={logout} >
                                    Logout</b>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </nav>
  )
}
