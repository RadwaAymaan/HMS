import React, { useState } from 'react'
import styles from './AddMedicine.module.css'
import {useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PharmacistContext } from '../../Context/PharmacistContext';
import { useContext, useEffect } from 'react';

export default function AddMedicine() {
  const [isLoading,setLoading]=useState(false)
  const [messageError,setmessageError]=useState('')
  let navigate =useNavigate()

  let{makeMedicine} = useContext(PharmacistContext)

  async function addMedicine(values){
    setLoading(true)  
    let {data} = await makeMedicine(values);
    console.log(data);
    if (data.message === 'success')
        {
          setLoading(false)
          toast.success('Success message');
          
          navigate('/Pharmacist')
        }
   }
  
  let validationSchema=Yup.object({
    Medicine_name:Yup.string().required('Name is required'),
    Medicine_quantity:Yup.number().required('Quatity is required'),
    Medicine_price:Yup.number().required('Price is required'),
    
      })

  let formik = useFormik({ 
    initialValues:
    {
        Medicine_name:"",
        Medicine_quantity:0,
      
        Medicine_price:0,
     
  },validationSchema,
  onSubmit:((values)=>{
    addMedicine(values)

  })
  })
  return<>
  <div className=' bg-opacity-75 bg-light p-3  m-5 '>
    <h3 className='fw-bold text-center text-primary text-opacity-75 p-2'>Add Medicine</h3>
    {messageError.length>0?<div className='alert alert-danger'>
      {messageError}
    </div>:null}
    
    <form onSubmit={formik.handleSubmit} >
      <div className=" d-flex flex-wrap">
        <div className="w-50 p-2 ">
      <label className='fw-bold' htmlFor="Medicine_name">Medicine_name</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='Medicine_name' id='Medicine_name' value={formik.values.Medicine_name} onChange={formik.handleChange}/>
      {formik.errors.Medicine_name && formik.touched.Medicine_name ?<div className='alert alert-danger'>{formik.errors.Medicine_name}</div>:null}
      </div>
      
      
      
      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="Medicine_quantity">Medicine_quantity</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="number" name='Medicine_quantity' id='Medicine_quantity' value={formik.values.Medicine_quantity} onChange={formik.handleChange}/>
      {formik.errors.Medicine_quantity && formik.touched.Medicine_quantity ?<div className='alert alert-danger'>{formik.errors.Medicine_quantity}</div>:null}
      </div>

      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="Medicine_price">Medicine_price</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="number" name='Medicine_price' id='Medicine_price' value={formik.values.Medicine_price} onChange={formik.handleChange}/>
      {formik.errors.Medicine_price && formik.touched.Medicine_price ?<div className='alert alert-danger'>{formik.errors.Medicine_price}</div>:null}
      </div>

      
      
     
      

  

      <div className="w-50 m-auto text-center  p-2 ">
       {isLoading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Add Medicine</button>}
       </div>
       
       </div>
    
   
    </form>
  </div>

  </>
}
