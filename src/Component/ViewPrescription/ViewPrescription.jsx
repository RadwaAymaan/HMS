import React from 'react'
import styles from './ViewPrescription.module.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  jwtDecode  from 'jwt-decode';
import { toast } from 'react-toastify';
import { useContext } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { useParams } from 'react-router-dom'
export default function ViewPrescription() {
  let navigate = useNavigate()
  let parmas = useParams()
  let {showPrescription,indOfPrescription} = useContext(DoctorContext)
 
  const [data, setdata] = useState([])

  async function viewprescription(doctorId,patientId){
    let {data} = await showPrescription(doctorId,patientId)
    setdata(data.data)
    console.log(data)
  } 

  function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
  
    viewprescription(decodedToken.id,parmas.id)
    }
    function shareIndex(vg){
      indOfPrescription(vg)      
    }
    useEffect(()=>{
      saveUser()
    },[])
  return<>
   <div className="">
   <div className='bg-opacity-75 bg-light p-4 rounded  m-5'>
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
       
       
       <button onClick={(()=>{
         shareIndex(inde)
       navigate(`/Doctor/EditPrescription/${parmas.id}`)
       })} className='btn btn-outline-primary fw-bold text-black text-center m-auto mb-3'>Update</button>
      </div>
))}
    </div>
   </div>
   </div>
  </>
}
