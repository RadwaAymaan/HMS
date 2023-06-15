import React, { useState } from 'react'
import styles from './Login.module.css'
import {   useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export default function Login({saveUserData}) {
  let navigate =useNavigate()
  const [isLoading,setLoading]=useState(false)
  const [messageError,setmessageError]=useState('')

  function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);

    if(decodedToken.role == 'user'){navigate('/Patient')}
    if(decodedToken.role == 'admin'){navigate('/Admin')}
    if(decodedToken.role == 'doctor'){navigate('/Doctor')}
    if(decodedToken.role == 'pharmacist'){navigate('/Pharmacist')}
    if(decodedToken.role == 'Nurse'){navigate('/Nurse')}
    if(decodedToken.role == 'Radiologist'){navigate('/Radiologist')}
    if(decodedToken.role == 'Laboratoriest'){navigate('/Labotariest')}
    if(decodedToken.role == 'Accountant'){navigate('/Accountant')}
   
    }


  
 async function handelLogin(values){
  setLoading(true) 
   let { data }= await axios.post(`http://localhost:3000/user/signIn`,values).catch((errr)=>{
  setLoading(false)
  setmessageError(`${errr.response.data.Error}`)
   })
  
    if (data.message === 'success')
    {
      localStorage.setItem('Token',data.Token)
      setLoading(false)
      saveUser()
      saveUserData()
     
    }
  }
  let validationSchema=Yup.object({
    email:Yup.string().required('Email is required').email('Email is invaled'),
    password:Yup.string().required('password is required').matches(/^[A-Za-z0-9@$*#%-_]{3,10}$/,"Password Not Matching"),
 
  })
  let formik = useFormik({ 
    initialValues:
    {
       
        email:'',
        password:'',
       
    
  },validationSchema,
  onSubmit:handelLogin
  })
  return<>
  <div className="vh-100 m-auto lay">
  <div className="d-flex  h-75  justify-content-center align-items-center  ">
  <div className='container w-50 bg-opacity-75  bg-light p-4 mx-5 rounded'>
    <div className='w-100'>
    {messageError.length>0?<div className='alert alert-danger'>
      {messageError}
    </div>:null}
    </div>
    <div className='w-100'>
    <form onSubmit={formik.handleSubmit} >
      
       
      <label className='fw-bold fs-4' htmlFor="email">Email</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange}/>
      {formik.errors.email && formik.touched.email ?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
      
      <label className='fw-bold fs-4' htmlFor="password">Password</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange}/>
      {formik.errors.password && formik.touched.password ?<div className='alert alert-danger'>{formik.errors.password}</div>:null}
      <span onClick={()=>{
        navigate('/ForgetPassword')
       }} className=' hover cursor-pointer  m-1 fs-5'>
        Forget Password
    </span>
    <h2 className='h5 mt-1  mb-2 text-black'>Don’t Have Account?<span onClick={()=>{
        navigate('/Register')
       }} className='cursor-pointer text-primary ms-2'>
        Register
    </span></h2>
      
      <div className=" m-auto text-center mt-3">
       {isLoading?<button className='btn fw-bold  btn-outline-primary text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Login</button>}
       </div>

    </form>
    </div>
  </div>
  </div>
  </div>
  </>
}
