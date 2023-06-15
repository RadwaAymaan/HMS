import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import {Helmet} from "react-helmet";
export default function Navbar({userData ,logout}) {
  return<>
  <Helmet>
      <title>HMS</title>         
       </Helmet>
  <nav className="navbar navbar-expand-sm navbar-dark bg-opacity-25 bg-dark ">
      <div className="container w-100 m-2"  style={{height:"35px"}}>
      <Link className="navbar-brand ms-3  d-flex ">
        <img className='rounded  ' style={{width:'15%'}} src={logo} alt="" />
       
      </Link>
      <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
        aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse   me-0 " id="collapsibleNavId">
       
        
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0 ">
         {userData == null?<><li className="nav-item m-2 ">
         <Link className="nav-link fw-bold text-primary" to="HMS">Login</Link>
       </li>
       <li className="nav-item m-2">
         <Link className="nav-link fw-bold text-primary" to="Register">Register</Link>
       </li></>:<li className="nav-item">
            <span onClick={logout} className="nav-link text-primary cursor-pointer fw-bold" >Logout</span>
          </li>}
         
         
          
          
          
        </ul>
        
      </div>
    </div>
  </nav>
  
  </>
}
