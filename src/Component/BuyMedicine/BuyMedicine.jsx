import React, { useState } from 'react'
import styles from './BuyMedicine.module.css'
import {useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { PharmacistContext } from '../../Context/PharmacistContext';
import { useContext } from 'react';
export default function BuyMedicine() {
  const [isLoading,setLoading]=useState(false)
  const [Loading,setisLoading]=useState(false)
  let navigate =useNavigate()
  let parmas = useParams()
  let{buyMedicine,num,mid,finishBuy} = useContext(PharmacistContext)

  async function Buy(patientId,values){
    setLoading(true)
    let {data} = await buyMedicine(patientId,values) 
    console.log(data)
    if (data.message === 'success')
       {
         setLoading(false)
         toast.success('Success message');
       }
  }

  async function finish(id){
    setLoading(true)
    let {data} = await finishBuy(id) 
    console.log(data)
    if (data.message === 'success')
       {
        setisLoading(false)
         toast.success('Success message');
         
          navigate('/Pharmacist')
       }
  }

  let formik = useFormik({ 

    initialValues:
    { 
      nameMedicine:'',
      quantity:0,
     },
    onSubmit:((values)=>{
      Buy(parmas.id,values)

    })
  })
  return<>
  <div className=' bg-opacity-75 bg-light p-3  m-5 '>
    <h3 className='fw-bold text-center text-primary text-opacity-75 p-2'>Buy Medicine</h3>
    <form onSubmit={formik.handleSubmit} >
      <div className=" d-flex flex-wrap">
        <div className="w-50 p-2 ">
      <label className='fw-bold' htmlFor="nameMedicine">Medicine</label> 
    
     <select onBlur={formik.handleBlur} className="form-select mb-2 "  name='nameMedicine' id='nameMedicine' value={formik.values.nameMedicine} onChange={(e)=>{formik.setFieldValue('nameMedicine',e.target.value)}}>
      <option >Please Select one</option>
      {((mid[num].Medication)).map((ra,ind)=>(
        
        <option key={ind+8}  value={ra.value} >
         {ra.value}
      </option>
        
      ))}
    </select>
      </div>

      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="quantity">Quantity</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="number" name='quantity' id='quantity' value={formik.values.quantity} onChange={formik.handleChange}/>
    
      </div>
     

      <div className="w-25 m-auto text-center p-1 d-flex justify-content-between">

       {isLoading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Buy</button>}
     

     
       {Loading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button  type='submit' onClick={()=>{
        finish(mid[num].prescriptionId)
       }} className='btn  btn-outline-primary fw-bold text-black'>Finish</button>}
       </div>
       
      </div>
      
     </form>
    </div>
  </>
}
