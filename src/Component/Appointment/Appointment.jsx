import React from 'react'
import styles from './Appointment.module.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  jwtDecode  from 'jwt-decode';
import { DoctorContext } from '../../Context/DoctorContext';
import { useContext } from 'react'

export default function Appointment() {
  const [data, setdata] = useState([])
  let navigate = useNavigate()
  let{Appointment,Date,checkMedicalHistory} = useContext(DoctorContext)
 

function date(Dat) {
  Date(Dat)
}

  function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    viewAppointment(decodedToken.id)
    console.log(decodedToken.id);
    }
    useEffect(() => {
      saveUser()
     
    }, []); 
   
  async function viewAppointment(doctorId){
    let {data} = await Appointment(doctorId)
     setdata(data.Data)
     console.log(data)
     
  }

  return<>
  
  <div className="m-auto container">
  <div className="m-2 mt-5">
  <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered ">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th style={{width:'5%'}} scope="col">#</th>
      <th style={{width:'22%'}}  scope="col">Patient Name</th>
      <th style={{width:'19%'}} scope="col">Date</th>
      <th scope='col'></th>
      
     
    </tr>

  </thead>
  <tbody>

  {data!== null? <> 
  {data.map((Patient,index)=>(
   
   <tr key={index} >
      
    <th scope="row">{index}</th>
   
    <td onClick={(()=>{
       navigate(`/Doctor/PatientDetails/${Patient.Appointment.Patient}`)
    })} className='fs-4 cursor-pointer hover'>{Patient.Patient.name}</td>

    <td className='fs-4'>{Patient.Appointment.Date}</td>

    <td className='fs-4 '>
    {Patient.medicalHistory==false?<>
      <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
        navigate(`/Doctor/AddMedicalHistory/${Patient.Appointment.Patient}`)
        date(Patient.Appointment.Date)
       
    }}>Add MedicalHistory</button>
    </>:null}

    <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
      
      navigate(`/Doctor/ViewPatientHistory/${Patient.Appointment.Patient}`)
    }}>View Medical History</button>

    {Patient.Prescription==false?<>
      <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
        navigate(`/Doctor/AddPrescription/${Patient.Appointment.Patient}`)
        date(Patient.Appointment.Date)
       
    }}>Add Prescription</button>
    </>:null}
    

    <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
        navigate(`/Doctor/ViewPrescription/${Patient.Appointment.Patient}`)      
    }}>View Prescription</button>
    
   <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
        navigate(`/Doctor/AddDisease/${Patient.Appointment.Patient}`)
    }}>Add Disease</button>
    
    {Patient.LabReport==true?<>
      <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
      
      navigate(`/Doctor/AllLabReports/${Patient.Appointment.Patient}`)
    }}>All Lab Reports</button>
    </>:null}
   
    {Patient.X_RayReport==true?<>
      <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
      
      navigate(`/Doctor/AllX_rayReports/${Patient.Appointment.Patient}`)
    }}>All X_ray Reports</button>
    </>:null}

    {Patient.PatientReport==true?<>
      <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
      
      navigate(`/Doctor/PatientVitalSigns/${Patient.Appointment.Patient}`)
    }}>View Vital Signs</button>
    </>:null}
     
    </td>
   
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
