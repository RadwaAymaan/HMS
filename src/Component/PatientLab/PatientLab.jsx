import React, { useContext, useEffect, useState } from 'react'
import { LaboratoriestContext } from '../../Context/LaboratoriestContext';
import {  useNavigate } from 'react-router-dom';
import styles from './PatientLab.module.css'
export default function PatientLab() {
  let{showPatient,lab, setlab,setnum,setpreId} = useContext(LaboratoriestContext)
  
  let navigate =useNavigate()
 
 async function viewPatient(){
  let{data} = await showPatient()
  console.log(data);
  setlab(data.Patient)
 
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
      <th scope="col">Lab</th>
      <th scope="col">Report</th>

    </tr>

  </thead>
  <tbody>

  {lab!== null? <> 
  {lab.map((patient,index)=>(
    
   <tr  key={index} >
      <th key={index+1} className='bg-success bg-opacity-50 ' scope="row">{index}</th>
      
    
   
    <td  key={index+2} className='fs-5 cursor-pointer'>{patient.result.user.name}</td>
    <td key={index+9} className='fs-5'>{patient.result.user.email}</td>
    <td key={index+8} className='fs-5'>{patient.result.user.DOB}</td>
 

    <td key={index+6} className='fs-5'>
     <select  className='w-100' id="">
      {((patient.Lab)).map((lab,index)=>(
        
        <option key={index+8} className='w-100' >
         {lab.value}
      </option>
        
      ))}
 
    </select></td>
    <td className='text-center'>
    <button onClick={(()=>{
      setnum(index)
      setpreId(patient.prescriptionID)
      navigate(`/Labotariest/AddLabReport/${patient.result._id}`)
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
