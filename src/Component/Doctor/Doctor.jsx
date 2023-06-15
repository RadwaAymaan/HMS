import React from 'react'
import styles from './Doctor.module.css'
import { Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import {Helmet} from "react-helmet";
export default function Doctor({saveUserData}) {
  useEffect(() => {
    saveUserData()
   
  }, []); 
  return<>
    <Helmet>
      <title>HMS/Doctor</title>         
       </Helmet>
    <div className="row m-0 min-vh-100 lay">
      <div className="col-2 bg-opacity-50 bg-light ">
     
      <div className=" text-center p-2 bg-opacity-25 fw-bold bg-primary mt-3 ">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Time
          </a>
          <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="ViewTiming">ViewTiming</Link></li>
            <li><Link className="dropdown-item fw-bold" to="Limit">Set Limit</Link></li>
            
          </ul>
        </div>
      </div>
      <div className=" text-center p-2 bg-opacity-25 fw-bold bg-primary mt-3">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Appointment
          </a>
          <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="Appointment">View Appointment</Link></li>
            
            
          </ul>
        </div>

      </div>
      
      <div className=" text-center p-2 bg-opacity-25 fw-bold bg-primary mt-3">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Patient
          </a>
          <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="DoctorPatient">All Patient</Link></li>
          
          </ul>
        </div>
        
      </div>
      </div>
      <div className="col-md-10">
      <Outlet></Outlet>
      </div>
    </div>
  
 
 
  
  
  </>
}
