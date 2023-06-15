import React, { useContext, useEffect, useState } from 'react'
import styles from './PatientDetails.module.css'
import { DoctorContext } from '../../Context/DoctorContext';
import {  useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';

export default function PatientDetails() {
  let{showpatientDetails} = useContext(DoctorContext)
  let navigate = useNavigate()
  let parmas = useParams()
  const [data, setdata] = useState([])

  async function PatientDetails(patientId,doctorId){
  let{data} = await showpatientDetails(patientId,doctorId)
  setdata([data.data])
  console.log(data);
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
  <div className="m-auto">
  <div className="m-2 mt-5">
  <div className=" bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Appointments</th>
      <th scope='col'>Room</th>
      <th scope='col'>Prescription</th>
      <th scope='col'>MedicalHistory</th>
      <th scope='col'>Lab Report</th>
      <th scope='col'>X_ray Report</th>
     
    </tr>

  </thead>
  <tbody>

  {data!== null? <> 
  {data.map((Patient,index)=>(
   <tr key={index} >
      
    <th scope="row">{index}</th>
    <td  className='fs-4'>{Patient.userDetails.name}</td>

    {Patient.appointments.length>0?<>
      <td key={index+6} className='fs-4'>
     <select className='w-100' id="">
      {Patient.appointments.map((date,index)=>(
        
        <option key={index+8} className='w-100' value="">
         {date.Date}
       </option>
        
      ))}
 
    </select></td>
    </>:<td className='fs-5'> No appointment</td>}
   
    {Patient.Room !== null?<>
      <td className='pt-3' ><span className='border-end border-2 border-dark text-primary '>Room Type : <span className='text-dark me-1'>{Patient.Room.Room.RoomType}</span> </span> 
    <span className='ms-1 text-primary'>Price : <span className='text-dark'>{Patient.Room.Room.price}</span> </span>
    </td>
    </>:<td className='fs-5'> No room</td> }
    
    {Patient.prescription.length>0?<>
      <td>
    <button className='btn  btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
        navigate(`/Doctor/AllPrescription/${parmas.id}`)      
    }}>View Prescription</button>
    </td>
    </>:<>
   <td className='fs-5'>  No Prescription </td>
    </>}
    {Patient.medicalHistory !==null?<>
      <td>
    <button className='btn  btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
        navigate(`/Doctor/ViewPatientHistory/${parmas.id}`)      
    }}>View MedicalHistory</button>
    </td>
    </>:<>
   <td className='fs-5'>  No MedicalHistory </td>
    </>}
    
    {Patient.LabReport.length>0?<>
      <td>
    <button className='btn  btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
        navigate(`/Doctor/AllLabReports/${parmas.id}`)      
    }}>View Report</button>
    </td>
    </>:<>
    <td className='fs-5'>  No Report </td>
    </>}

    {Patient.X_RayReport.length>0?<>
      <td>
    <button className='btn  btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
        navigate(`/Doctor/AllX_rayReports/${parmas.id}`)      
    }}>View Report</button>
    </td>
    </>:<>
    <td className='fs-5'>  No Report </td>
    </>}
    

    

   </tr>
  ))}
  </>:null}
  
  </tbody>
    </table>
    </div>
    </div>
    </div>
  </>
}
