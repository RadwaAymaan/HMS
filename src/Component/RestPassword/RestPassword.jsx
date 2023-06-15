import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './RestPassword.module.css'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify';

 export default function RestPassword() {
  let navigate = useNavigate();
  const [loading, setloading] = useState(false)
 
  async function handleLogin(values){
  setloading(true)
  let {data} = await  axios.post(`http://localhost:3000/user/restPassword`,values).catch((err)=>{
     
      toast.error(err.response.data.message)
      setloading(false)
    })   

    if (data.message === 'success')
    {
      setloading(false)
      navigate('/HMS')
    }
  console.log(data);
  }
  let validationSchema=Yup.object({
    newPassword:Yup.string().required('newPassword is required'),
    confirmPassword:Yup.string().required('confirmPassword is required').oneOf([Yup.ref('newPassword')],"password and rePassword dosent match"),
  })
  let formik = useFormik({
    initialValues:{
      email:'',
      code:'',
      newPassword:'',
      confirmPassword:''
    },validationSchema,
    onSubmit:handleLogin
  });
   return <>
   <div className='min-vh-100 lay p-3'>
   <div className="w-50 m-auto py-4 bg-opacity-75 bg-light mt-5 rounded">
    <h3 className='text-center text-primary'>Reset New Password</h3>
    
    <form onSubmit={formik.handleSubmit}> 
    <div className='d-flex flex-wrap'>
    <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="email">Email</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange}/>
      </div>
    <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="code">code</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="number" name='code' id='code' value={formik.values.code} onChange={formik.handleChange}/>
      </div>
     
      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="newPassword">New newPassword</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="password" name='newPassword' id='newPassword' value={formik.values.newPassword} onChange={formik.handleChange}/>
      {formik.errors.newPassword && formik.touched.newPassword ?<div className='alert alert-danger'>{formik.errors.newPassword}</div>:null}
      </div>

      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="confirmPassword">confirmPassword</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="password" name='confirmPassword' id='confirmPassword' value={formik.values.confirmPassword} onChange={formik.handleChange}/>
      {formik.errors.confirmPassword && formik.touched.confirmPassword ?<div className='alert alert-danger'>{formik.errors.confirmPassword}</div>:null}
      </div> 
      </div>
    <div className='text-center m-auto w-75'>
   {loading?<button disabled={!(formik.isValid && formik.dirty)} className='btn  btn-outline-primary fw-bold text-black' type='button'><i className='fas fa-spinner fa-spin'></i></button>:<button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Save</button>}
   </div> 
    </form>
   </div>
   </div>
   </>
 }
