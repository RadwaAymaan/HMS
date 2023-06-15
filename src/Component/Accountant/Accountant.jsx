import React from 'react'
import styles from './Accountant.module.css'
import { Link, Outlet } from 'react-router-dom';
import  { useEffect } from 'react'
export default function Accountant({saveUserData}) {
  useEffect(() => {
    saveUserData()
  }, []); 

  return<>
  <div className="row m-0 vh-100 lay">
      <div className="col-2 bg-opacity-50 bg-light ">
     
      <div className=" text-center mt-3 p-2 bg-opacity-25 fw-bold bg-primary rounded">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Payment
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="ViewPatientNotPay">Patient Not Pay</Link></li>
            <li><Link className="dropdown-item fw-bold" to="ViewPatientPay">Patient Pay</Link></li>
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
