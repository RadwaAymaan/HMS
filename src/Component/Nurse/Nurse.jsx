
import styles from './Nurse.module.css'
import { Link, Outlet } from 'react-router-dom';
import React, { useEffect } from 'react'
export default function Nurse({saveUserData}) {
  useEffect(() => {
    saveUserData()
  }, []); 

  return<>
  <div className="row m-0 vh-100 lay">
      <div className="col-2 bg-opacity-50 bg-light ">
     
      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary rounded">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Patient
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="ViewAllPatients">View Patient</Link></li>
            
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
