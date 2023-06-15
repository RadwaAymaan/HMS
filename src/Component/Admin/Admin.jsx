import React, { useEffect } from 'react'
import styles from './Admin.module.css'
import { Link, Outlet } from 'react-router-dom';
import {Helmet} from "react-helmet";
export default function Admin({saveUserData}) {
  useEffect(() => {
    saveUserData()
  }, []); 
  return<>
    <Helmet>
      <title>HMS/Admin</title>         
       </Helmet>
    <div className="row m-0 min-vh-100 lay">
      <div className="col-2 bg-opacity-50 bg-light ">
     
      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary ">
         
      <Link className="fw-bold text-decoration-none text-black" to=""><span className='fs-5 fw-bold'><i className="fa-solid fa-house fa-l me-2" style={{color:'black'}}></i>Dashboard</span></Link>
            
          
        
      </div>
      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary ">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Doctor
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="AddDoctor">Add Doctor</Link></li>
            <li><Link className="dropdown-item fw-bold" to="AllDoctors">Find All</Link></li>
            
          </ul>
        </div>
      </div>

      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary ">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Pharmacist
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="AddPharmacist">Add Pharmacist</Link></li>
            <li><Link className="dropdown-item fw-bold" to="AllPharmacists">Find All</Link></li>
            
          </ul>
        </div>
      </div>

      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary ">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Radiologist
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="AddRadiologist">Add Radiologist</Link></li>
            <li><Link className="dropdown-item fw-bold" to="AllRadiologists">Find All</Link></li>
            
          </ul>
        </div>
      </div>

      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary ">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Laboratoriest
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="AddLaboratoriest">Add Laboratoriest</Link></li>
            <li><Link className="dropdown-item fw-bold" to="AllLaboratoriests">Find All</Link></li>
            
          </ul>
        </div>
      </div>

      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary ">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Accountant
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="AddAccountant">Add Accountant</Link></li>
            <li><Link className="dropdown-item fw-bold" to="AllAccountants">Find All</Link></li>
            
          </ul>
        </div>
      </div>

      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary ">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Nurse
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="AddNurse">Add Nurse</Link></li>
            <li><Link className="dropdown-item fw-bold" to="AllNurses">Find All</Link></li>
            
          </ul>
        </div>
      </div>

      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary ">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Employee
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="AddEmployee">Add Employee</Link></li>
            <li><Link className="dropdown-item fw-bold" to="AllEmployees">Find All</Link></li>
            
          </ul>
        </div>
      </div>

      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary ">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Room
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="AddRoom">Add Room</Link></li>
            <li><Link className="dropdown-item fw-bold" to="AllRooms">All Rooms</Link></li>
            
          </ul>
        </div>
      </div>

      <div className=" text-center mt-2 p-2 bg-opacity-25 fw-bold bg-primary ">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Patients
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="AllPatients">Find All</Link></li>
            
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
