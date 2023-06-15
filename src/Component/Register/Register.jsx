import React, { useState } from 'react'
import styles from './Register.module.css'
import {   useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



export default function Register() {
  let navigate =useNavigate()
  const [isLoading,setLoading]=useState(false)
  

 async function handleRegister(values){
  setLoading(true) 
   let { data }= await axios.post(`http://localhost:3000/user/SingnUp`,values).catch((errr)=>{
  
  setLoading(false)
  toast.error(`${errr.response.data.Error}`)
   })

    if (data.message === 'success')
    {
      setLoading(false)
      navigate('/HMS')
    }
  }
  let validationSchema=Yup.object({
    name:Yup.string().required('Name is required').min(3,'Name minLenth 3').max(20,'Name maxLenth 20'),
    email:Yup.string().required('Email is required').email('Email is invaled'),
    password:Yup.string().required('password is required').matches(/^[A-Za-z0-9@$*#%-_]{3,10}$/,"Password Not Matching"),
    repeat_password:Yup.string().required('repeat_password is required').oneOf([Yup.ref('password')],"password and rePassword dosent match"),
    Mobile:Yup.string().required('Mobile is required').matches(/^01[0125][0-9]{8}$/,"Mobile is invalid"),
    Gender:Yup.string().required('Gender is required'),
    DOB:Yup.string().required('Birth Date is required'),
    Address:Yup.string().required('Address is required')
  })
  let formik = useFormik({ 
    initialValues:
    {
        name:"",
        email:'',
        password:'',
        repeat_password:"",
        Mobile:"",
        Gender:'',
        DOB:"",
        Address:''
    
  },validationSchema,
  onSubmit:handleRegister
  })
  return<>
  <div className="vh-100 lay">
    <div className=' d-flex  h-75  justify-content-center align-items-center'>
  <div className='w-75  m-auto mt-5 rounded  bg-light p-5 bg-opacity-75'>
    <h3 className='fw-bold text-center text-primary text-opacity-75'>Register As Patient  </h3>
    
    <form onSubmit={formik.handleSubmit} >
      <div className=" d-flex flex-wrap">
        <div className="w-50 p-2 ">
      <label className='fw-bold' htmlFor="name">Name</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange}/>
      {formik.errors.name && formik.touched.name ?<div className='alert alert-danger'>{formik.errors.name}</div>:null}
      </div>
      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="email">Email</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange}/>
      {formik.errors.email && formik.touched.email ?<div className='alert alert-danger'>{formik.errors.email}</div>:null}
      </div>
     
      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="password">password</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange}/>
      {formik.errors.password && formik.touched.password ?<div className='alert alert-danger'>{formik.errors.password}</div>:null}
      </div>

      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="repeat_password">repeat_password</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="password" name='repeat_password' id='repeat_password' value={formik.values.repeat_password} onChange={formik.handleChange}/>
      {formik.errors.repeat_password && formik.touched.repeat_password ?<div className='alert alert-danger'>{formik.errors.repeat_password}</div>:null}
      </div>

      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="Mobile">Mobile</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="tel" name='Mobile' id='Mobile' value={formik.values.Mobile} onChange={formik.handleChange}/>
      {formik.errors.Mobile && formik.touched.Mobile ?<div className='alert alert-danger'>{formik.errors.Mobile}</div>:null}
      </div>

      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="Gender"> Gender :</label>
     <select onBlur={formik.handleBlur} className="form-select mb-2 " name="Gender" id='Gender'  value={formik.values.Gender} onChange={formik.handleChange}>
           <option ></option>
           <option selected={"Male"}>Male</option>
           <option value="Female">Female</option> 
       </select>
       {formik.errors.Gender && formik.touched.Gender ?<div className='alert alert-danger'>{formik.errors.Gender}</div>:null}
       </div>

       <div className="w-50 p-2">
       <label className='fw-bold' htmlFor="DOB">Birth Date</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="date" name='DOB' id='DOB' value={(formik.values.DOB)}    onChange={formik.handleChange}/>
      {formik.errors.DOB && formik.touched.DOB ?<div className='alert alert-danger'>{formik.errors.DOB}</div>:null}
      </div>
       
      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="Address">Address</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='Address' id='Address' value={formik.values.Address} onChange={formik.handleChange}/>
      {formik.errors.Address && formik.touched.Address ?<div className='alert alert-danger'>{formik.errors.Address}</div>:null}
      </div>
      
      <div className=" m-auto">
       {isLoading?<button className='btn btn-outline-primary fw-bold text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-outline-primary fw-bold text-black'>Register</button>}
       </div>
       
       </div>
       
   
   
   
    </form>
  </div>
  </div>
  </div>
  </>
}
