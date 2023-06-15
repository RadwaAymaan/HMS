import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './ForgetPassword.module.css'
import { toast } from 'react-toastify';
export default function ForgetPassword() {

 const [loading, setloading] = useState(false)
 let navigate = useNavigate()
 async function handlePassword(values){
   setloading(true)
   let {data} = await  axios.patch(`http://localhost:3000/user/sendCode`,values).catch((errr)=>{
    setloading(false) 
    toast.error(`${errr.response.data.Error}`)
     })

     if (data.message === 'success')
    {
      
      setloading(false) 
      navigate('/RestPassword')
     
    }
  
 }

 let validation = Yup.object({
   email:Yup.string().required('Email is Required').email('Email invalid'),
 })

 let formik = useFormik({
   initialValues:{
    email:'',
   },
   validationSchema:validation,
   onSubmit:handlePassword
 })

  return <>
  <div className="min-vh-100 lay p-3">
  <div className="w-50 m-auto py-4 bg-opacity-75 bg-light mt-5 rounded text-center">
  <h3 className='text-primary'>Forget Password</h3>   
 <form onSubmit={formik.handleSubmit}>

 <div className='d-flex w-75 justify-content-center m-auto p-3 flex-wrap'>
  <label className='fw-bold p-2 fs-4 text-primary' htmlFor="">Email :</label>
  <input  onBlur={formik.handleBlur} type="email" name='email' id='email' className='w-50 form-control mb-2' onChange={formik.handleChange} value={formik.values.email}/>
  {formik.touched.email && formik.errors.email ?(<div className='w-50 me-0  alert alert-danger'>{formik.errors.email}</div>) : null}  
  </div>
  
  {loading?<button disabled={!(formik.isValid && formik.dirty)} className='btn  btn-outline-primary fw-bold text-black' type='button'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-outline-primary fw-bold text-black'>Send</button>}
  
   </form>
   </div>
     </div>
  </>
}


