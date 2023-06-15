import React from 'react'
import styles from './Layout.module.css'
import { Outlet ,useNavigate } from 'react-router-dom'
import Navbar from './../Navbar/Navbar';

 export default function Layout({userData,setUerData,parmas}) {
  let navigate =useNavigate()
  function logout(){
    localStorage.removeItem('Token')
    setUerData(null)
    navigate('/HMS')
  }

  return<>
  
  <div className="">
 
  <Navbar  logout={logout} userData={userData}/>
  <Outlet></Outlet>
  </div>
  </>
}
