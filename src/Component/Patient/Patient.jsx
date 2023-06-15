import React, { useEffect, useState } from 'react'
import styles from './Patient.module.css'
import { Link, Navigate, Outlet, } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react'
import { PatientContext } from '../../Context/PatientContext'
import { toast } from 'react-toastify';
import {Helmet} from "react-helmet";
export default function Patient({saveUserData}) {
  let {pay} = useContext(PatientContext)
  let navigate = useNavigate() 
  const [isLoading, setisLoading] = useState(false)
  
  const [order, setorder] = useState([])

  async function payOrder() {
    setisLoading(true)
    let {data}=await pay();
    console.log(data.URL);
    if (data.message === 'success')
    {
      setisLoading(false)
      toast.success('Success message');
      window.open(`${data.URL}`);
    }
    
  }
  useEffect(() => {
    saveUserData()
  }, []); 
  return<>
    <Helmet>
      <title>HMS/Patient</title>         
       </Helmet>
    <div className="row m-0 min-vh-100 lay">
      <div className="col-2 bg-opacity-50 bg-light ">
     
      
      <div className=" text-center p-2 bg-opacity-25 fw-bold bg-primary mt-3">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Medical History
          </a>
          <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="ViewMedicalHistory">View MedicalHistory</Link></li>
          </ul>
        </div>
      </div>
     
      <div className=" text-center p-2 bg-opacity-25 fw-bold bg-primary mt-3">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Time
          </a>
          <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="ViewDoctors">View Doctors</Link></li>
            <li><Link className="dropdown-item fw-bold" to="ViewAppointment">View Appointment</Link></li>
            
            
          </ul>
        </div>
      </div>
   
      <div className=" text-center p-2 bg-opacity-25 fw-bold bg-primary mt-3">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Rooms
          </a>
          <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="ViewRoom">View Room</Link></li> 
            <li><Link className="dropdown-item fw-bold" to="ViewBookRoom">View Book Room</Link></li> 
          </ul>
        </div>
      </div>

      <div className=" text-center p-2 bg-opacity-25 fw-bold bg-primary mt-3">
      <div className="nav-item dropdown m-3">
          <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Reports
          </a>
          <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item fw-bold" to="PatientLabReport">Lab Report</Link></li> 
            <li><Link className="dropdown-item fw-bold" to="PatientXrayReport">Xray Report</Link></li> 
            <li><Link className="dropdown-item fw-bold" to="VitalSigns">Vital Signs Report</Link></li> 
          </ul>
        </div>
      </div>

      <div className=" text-center p-2 bg-opacity-25 fw-bold mt-5">
      {isLoading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button onClick={payOrder} type='submit' className='btn  btn-outline-primary fw-bold text-black'>CheckOut</button>}
      </div>

      


      </div>
      <div className="col-md-10">
      <Outlet></Outlet>
      </div>
    </div>
  
 
   
  
  
  </>
}
