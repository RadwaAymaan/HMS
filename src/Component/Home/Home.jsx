import React from 'react'
import styles from './Home.module.css'
import Login from './../Login/Login';
import { Outlet } from 'react-router-dom';

export default function Home() {
  return<>
  <div className="w-100">
    <div className="row m-0">
      <div className="col-md-3 bg-primary min-vh-100 ">
        <h1>hi</h1>
        <Login/>
      </div>
      <div className="col-md-9 min-vh-100 bg-danger ">
      <Outlet></Outlet>
      </div>
    </div>
  </div>
  </>
}
