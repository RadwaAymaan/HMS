
import React, { useState } from 'react'
import {useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { NurseContext } from '../../Context/NurseContext';
import { useContext } from 'react';
import styles from './UpdateVitalSigns.module.css'
import { useEffect } from 'react';
export default function UpdateVitalSigns() {
  let {viewVitalSigns,editVitalSigns} = useContext(NurseContext)
  let parmas = useParams()
  console.log(parmas.id);
  let navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const [userData, setuserData] = useState([])
  const [result, setresult] = useState([])

  async function showVitalSigns(id){
    let {data} = await viewVitalSigns(id)
    setuserData(data.user)
    setresult(data.result)
    console.log(data);
    }

  async function UpdateVitalSigns(id,values){
    let {data} =  await editVitalSigns(id,values)
   console.log(data);
   if (data.message === 'success')
   {
     setisLoading(false)
     navigate(`/Nurse/AllVitalSigns/${parmas.id}`)
     toast.success('Success message');
   }

  }

  useEffect(()=>{
    showVitalSigns(parmas.id)
   },[])
  
  let formik = useFormik({ 
    initialValues:{
      bodyTemperature:result.bodyTemperature,
      pulseRate:result.pulseRate,
      respirationRate:result.respirationRate,
      bloodPressure:result.bloodPressure
    },enableReinitialize:true,
     onSubmit:(values)=>{
      UpdateVitalSigns(parmas.id,values)
     }
    
  })
  return<>
 <div className=' bg-opacity-75 w-75 m-auto bg-light p-3  mt-5 rounded'>
    <div  className="w-75 m-auto p-2">
    <h3 className='fw-bold text-center text-primary text-opacity-75 p-2'>Update Vital Signs</h3>
  <form onSubmit={formik.handleSubmit} >
  <div className="d-flex flex-wrap" >
  <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="bodyTemperature">Body Temperature :</label>
     <input onBlur={formik.handleBlur} className="form-control mb-2 " type='text' id='bodyTemperature' name='bodyTemperature'  value={formik.values.bodyTemperature} onChange={formik.handleChange}/>
     
       </div>
  <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="pulseRate">Pulse Rate :</label>
     <input onBlur={formik.handleBlur} className="form-control mb-2 " type='text' id='pulseRatey' name='pulseRate'  value={formik.values.pulseRate} onChange={formik.handleChange}/>
     
       </div>
  <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="respirationRate">Respiration Rate :</label>
     <input onBlur={formik.handleBlur} className="form-control mb-2 " type='text' id='respirationRatey' name='respirationRate'  value={formik.values.respirationRate} onChange={formik.handleChange}/>
     
       </div>
       <div className='w-50 p-2'>
      <label className='fw-bold' htmlFor="bloodPressure">Blood Pressure:</label>
      <input type="text"  className='w-100 form-control mb-2'  id="bloodPressure"name='bloodPressure'  value={formik.values.bloodPressure} onChange={formik.handleChange}/>
      </div>
 
 <div className=" m-auto text-center mt-3">
       {isLoading?<button className='btn fw-bold  btn-outline-primary text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Save</button>}
       </div>
       
 </div>
  </form>
 
  </div>
  </div>
  </>
}

