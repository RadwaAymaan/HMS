import React, { useContext, useEffect, useState } from 'react'
import styles from './PharPatient.module.css'
import {  useNavigate } from 'react-router-dom';
import { PharmacistContext } from '../../Context/PharmacistContext';
export default function PharPatient() {
  let{showPatient,setmid,setnum} = useContext(PharmacistContext)
  
  let navigate =useNavigate()
 const [data, setdata] = useState([])
 async function viewPatient(){
  let{data} = await showPatient()
  console.log(data);
  setdata(data.Patients)
  setmid(data.Patients)
 
 }
 useEffect(()=>{
  viewPatient()
 },[])

  return<>
   <div className='mt-5  m-auto'>
    <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Patient Name</th>
      <th scope="col">Age</th>
      <th scope="col">Doctor Name</th>
      <th scope="col">Specialization</th>
      <th scope="col">Medicine</th>
      <th scope="col">Buy Medicine</th>
    </tr>

  </thead>
  <tbody>

  {data!== null? <> 
  {data.map((patient,index)=>(
    
   <tr  key={index} >
      <th key={index+1} className='bg-success bg-opacity-50 ' scope="row">{index}</th>
      
    
   
    <td  key={index+2} className='fs-5 cursor-pointer'>{patient.user.name}</td>
    
    <td key={index+8} className='fs-5'>{patient.user.DOB}</td>

    <td key={index+9} className='fs-5'>{patient.NameOfDoctor}</td>
    <td key={index+9} className='fs-5'>{patient.SpecializationDoctor}</td>

    <td key={index+6} className='fs-5'>
     <select  className='w-100' id="">
      {((patient.Medication)).map((mide,index)=>(
        
        <option key={index+8} className='w-100' value="">
         {mide.value}
      </option>
        
      ))}
 
    </select></td>
    <td className='text-center'>
    <button onClick={(()=>{
      setnum(index)
      navigate(`/Pharmacist/BuyMedicine/${patient.PatientId}`)
    })} className='btn  btn-outline-primary fw-bold text-black btn-sm w-75'>
     Buy
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
