import React, { useContext, useEffect, useState } from 'react'

import { RadiologistContext } from '../../Context/RadiologistContext';
import {  useNavigate } from 'react-router-dom';

import styles from '../PatientX_ray/PatientX_ray.module.css'
export default function PatientXRay() {
  let {showPatient,setxray,setnum,setpresId}=useContext(RadiologistContext)
  let navigate =useNavigate()
 const [data, setdata] = useState([])
 async function viewPatient(){
  let{data} = await showPatient()
  console.log(data);
  setdata(data.Patient)
  setxray(data.Patient)
 
 }
 useEffect(()=>{
  viewPatient()
 },[])

  return<>
   <div className='mt-5 w-75 m-auto'>
    <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Patient Name</th>
      <th scope="col">Email</th>
      <th scope="col">Age</th>
      <th scope="col">X_ray</th>
      <th scope="col">Report</th>

    </tr>

  </thead>
  <tbody>

  {data!== null? <> 
  {data.map((patient,index)=>(
    
   <tr  key={index} >
      <th key={index+1} className='bg-success bg-opacity-50 ' scope="row">{index}</th>
      
    
   
    <td  key={index+2} className='fs-5 cursor-pointer'>{patient.result.user.name}</td>
    <td key={index+9} className='fs-5'>{patient.result.user.email}</td>
    <td key={index+8} className='fs-5'>{patient.result.user.DOB}</td>
 

    <td key={index+6} className='fs-5'>
     <select  className='w-100' id="">
      {((patient.X_Ray)).map((ray,index)=>(
        
        <option key={index+8} className='w-100' value="">
         {ray.value}
      </option>
        
      ))}
 
    </select></td>
    <td className='text-center'>
    <button onClick={(()=>{
      setnum(index)
      setpresId(patient.prescriptionID)
      navigate(`/Radiologist/AddX_rayReport/${patient.result._id}`)
    })} className='btn  btn-outline-primary fw-bold text-black btn-sm '>
      Add Report 
    </button>
    </td>

     

   </tr>
  ))}
  </>:null}
  
  </tbody>
 </table>
 </div> 
 </div>
  </>
}
