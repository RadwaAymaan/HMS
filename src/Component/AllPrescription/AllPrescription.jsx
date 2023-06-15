import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  jwtDecode  from 'jwt-decode';
import { toast } from 'react-toastify';
import { useContext } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { useParams } from 'react-router-dom'
import styles from './AllPrescription.module.css'
export default function AllPrescription() {
  let navigate = useNavigate()
  let parmas = useParams()
  let {showpatientDetails} = useContext(DoctorContext)
  const [data, setdata] = useState([])

  async function PatientDetails(patientId,doctorId){
    let{data} = await showpatientDetails(patientId,doctorId)
    setdata(data.data.prescription)
    }

    function saveUser(){
      let encodedToken = localStorage.getItem('Token');
      let decodedToken= jwtDecode(encodedToken);
      PatientDetails(parmas.id,decodedToken.id)
      }

      useEffect(()=>{
      saveUser()
      },[])

 return <>
     <div className="">
   <div className=' bg-opacity-75 bg-light p-4 rounded  m-5'>
    <div className="row m-0 gy-3">
      
    {data.map((pre,inde)=>(
   <div key={inde} className="col-md-10  m-auto bg-light rounded mb-3">

   {pre.Medication.length>0?<><div className="d-flex flex-wrap mt-2">
    <label className='fw-bold fs-5 p-2 w-25 text-main' htmlFor="">Medication :</label>
    {(pre.Medication).map((med,ind)=>(
    <p className=' p-2 border border-1 border-dark  me-1'>{med.value}</p>
    ))}
  
    </div></>:null}
    
    {pre.X_ray.length>0?<><div className="d-flex flex-wrap">
    <label className='fw-bold fs-5 p-2 w-25 text-main' htmlFor="">X_ray :</label>
    {(pre.X_ray).map((ray,ind)=>(
    <p className=' p-2 border border-1 border-dark me-1'>{ray.value}</p>
    ))}
   
    </div></>:null}
    
    {pre.Lab.length>0?<><div className="d-flex flex-wrap">
    <label className='fw-bold fs-5 p-2 w-25 text-main' htmlFor="">Lab :</label>
    {(pre.Lab).map((lab,ind)=>(
   <p className=' p-2 border  border-1 border-dark me-1'>{lab.value}</p>
    ))}
    
    </div></>:null}
    
    {(pre.Advice)!=='' && (pre.Advice)!==' '?<><div className="d-flex flex-wrap">
    <label className='fw-bold fs-5 p-2 w-25  text-main' htmlFor="">Advice :</label>
    <p className='h4 p-2'>{pre.Advice}</p>
    </div></>:null}

   <div className="d-flex flex-wrap">
    <label className='fw-bold fs-5 p-2 w-25  text-main' htmlFor="">Date :</label>
    <p className='h4 p-2'>{pre.datePatient}</p>
    </div>

    <div className="d-flex flex-wrap">
       <label className='fw-bold fs-5 p-2 w-25 text-main' htmlFor="">Doctor Name :</label>
       <p className='h4   p-2'>{pre.doctor.name}</p>
       </div>
    
   </div>
))}
    </div>
   </div>
   </div>
  </>
}
