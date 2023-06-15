import React from 'react'
import styles from './Limit.module.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as Yup from 'yup'
import  jwtDecode  from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Limit() {
  let navigate = useNavigate()
  let [userId,setUserId]=useState('')
  let [isLoading,setLoading]=useState(false)
  function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    setUserId(decodedToken.id);
    }

  useEffect(() => {
    saveUser()
   
  }, []); 

  
  async function  addLimitRange(values){
    setLoading(true)
     let {data}=await axios.post(`http://localhost:3000/Doctor/addLimitRange?userID=${userId}`,values,{
      headers:{token:`${localStorage.getItem('Token')}`}
     }).catch((errr)=>{
      console.log(errr);
      toast.error(`${errr.response.data.Error}`)
      setLoading(false)
    
     })
     if (data.message === 'success')
      {
        setLoading(false)
        toast.success('Success message');
        navigate(`/Doctor`)
       
      }
  }

  let validationSchema=Yup.object({
    limitRange:Yup.number().required('limitRange is required')
   })
 
   let formik = useFormik({ 
    initialValues:
    {
      limitRange:0
  }
  ,validationSchema,
  onSubmit:addLimitRange
  })

  return<>
   
  <form onSubmit={formik.handleSubmit} className='bg-opacity-75 bg-light p-3 w-50 mt-5 m-auto '>
<div className="w-50  m-auto ">
      <label className='fw-bold' htmlFor="limitRange">Limit Range</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="number" name='limitRange' id='limitRange' value={formik.values.limitRange} onChange={formik.handleChange}/>
      {formik.errors.limitRange && formik.touched.limitRange ?<div className='alert alert-danger'>{formik.errors.limitRange}</div>:null}
      </div>
      <div className="w-50 m-auto text-center">
      {isLoading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Add limit</button>}
      
      </div>
</form>

  </>
}
