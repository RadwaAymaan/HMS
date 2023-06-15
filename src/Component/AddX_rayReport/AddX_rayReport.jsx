import React, { useState } from 'react'
import styles from '../AddX_rayReport/AddX_rayReport.module.css'
import {useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { RadiologistContext } from '../../Context/RadiologistContext';
import { useContext } from 'react';

export default function AddXRayReport() {
  const [isLoading,setLoading]=useState(false)
  let navigate =useNavigate()
  let parmas = useParams()
  let{sendReport,xray,num,presId} = useContext(RadiologistContext)

  async function addReport(patientId,id,values,){
    setLoading(true)
    let {data} = await sendReport(patientId,id,values) 
    console.log(data)
    if (data.message === 'Done')
       {
         setLoading(false)
         toast.success('Success message');
         
         navigate('/Radiologist/ViewX_rayReport')
       }
  }
  
  let formik = useFormik({ 

    initialValues:
    {
      file:null,
      type:'',
      price:0,
     
  
    },
    onSubmit:((values)=>{
      addReport(parmas.id,presId,values)
     console.log(presId);
    })
  })
  return<>
  <div className=' bg-opacity-75 bg-light p-3  m-5 '>
    <h3 className='fw-bold text-center text-primary text-opacity-75 p-2'>Add Report</h3>
    <form onSubmit={formik.handleSubmit} >
      <div className=" d-flex flex-wrap">
        <div className="w-50 p-2 ">
      <label className='fw-bold' htmlFor="type">X_ray Type</label> 
    
     <select onBlur={formik.handleBlur} className="form-select mb-2 "  name='type' id='type' value={formik.values.type} onChange={(e)=>{formik.setFieldValue('type',e.target.value)}}>
      <option >Please Select one</option>
      {((xray[num].X_Ray)).map((ra,ind)=>(
        
        <option key={ind+8}  value={ra.value} >
         {ra.value}
      </option>
        
      ))}
    </select>
      </div>

      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="type">Price</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="number" name='price' id='price' value={formik.values.price} onChange={formik.handleChange}/>
    
      </div>
     
      <div className="w-50 p-2">
        <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="file" id='file'  onChange={(e)=>{formik.setFieldValue('file',e.target.files[0])}}/>
  
      </div>

      <div className="w-50 text-center p-1">
       {isLoading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Add Report</button>}
       </div>
       
      </div>
      
     </form>
    </div>
  </>
}
