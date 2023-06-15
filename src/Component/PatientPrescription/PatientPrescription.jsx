import React from 'react'
import styles from './PatientPrescription.module.css'
import { useContext } from 'react'
import { PatientContext } from '../../Context/PatientContext'
import  jwtDecode  from 'jwt-decode';
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
export default function PatientPrescription() {
  let{showPrescription} = useContext(PatientContext)
  const [user, setuser] = useState([])
  const [data, setdata] = useState([])
  const [doctorData, setdoctorData] = useState([])
  async function viewPrescription(id){
    let{data} = await showPrescription(id)
    console.log(data);
    setdata(data.data)
    setdoctorData(data.DoctorName)
  } 
  function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    viewPrescription(decodedToken.id)
    setuser(decodedToken.id)
    }
    useEffect(()=>{
     saveUser()
    },[])
    return<>
    <div className="">
    <div className=' bg-opacity-75 bg-light p-4 rounded  m-5'>
     <div className="row m-0 gy-3">
     {(data.map)((pre,index)=>(
      <div key={index} className="col-md-10 m-auto bg-light rounded mb-3">
      {pre.Medication.length>0?<><div className="d-flex flex-wrap mt-2">
       <label className='fw-bold fs-5 p-2 w-25 text-main' htmlFor="">Medication :</label>
       {(pre.Medication).map((med,ind)=>(
       <p className=' p-2 border border-1 border-dark  me-1'>{med.value}</p>
       ))}
       
 
       </div></>:null}
       {pre.X_ray.length>0?<><div className="d-flex flex-wrap">
       <label className='fw-bold fs-5 p-2 w-25 text-main' htmlFor="">X_ray :</label>
       {(pre.X_ray).map((ray,ind)=>(
       <p className=' p-2 border border-1 border-dark  me-1'>{ray.value}</p>
       ))}
      
       </div></>:null}
       
       {pre.Lab.length>0?<><div className="d-flex flex-wrap">
       <label className='fw-bold fs-5 p-2 w-25 text-main' htmlFor="">Lab :</label>
       {(pre.Lab).map((lab,ind)=>(
      <p className=' p-2 border border-1 border-dark  me-1'>{lab.value}</p>
       ))}
       
       </div></>:null}
       
       {(pre.Advice)!=='' && (pre.Advice)!==' '?<><div className="d-flex flex-wrap">
       <label className='fw-bold fs-5 p-2 w-25 text-main' htmlFor="">Advice :</label>
       <p className='h4 p-2'>{pre.Advice}</p>
       </div></>:null}
 
      <div className="d-flex flex-wrap">
       <label className='fw-bold fs-5 p-2 w-25 text-main' htmlFor="">Date :</label>
       <p className='h4   p-2'>{pre.datePatient}</p>
       </div>

      <div className="d-flex flex-wrap">
       <label className='fw-bold fs-5 p-2 w-25 text-main' htmlFor="">Doctor Name :</label>
       <p className='h4   p-2'>{doctorData[index].name}</p>
       </div>
       
      </div>
     ))}
     </div>
    </div>
    </div>
   </>
}
