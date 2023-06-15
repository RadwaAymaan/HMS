import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { NurseContext } from '../../Context/NurseContext';
import styles from './ViewAllPatients.module.css'
export default function ViewAllPatients() {
  let{allPatients} = useContext(NurseContext)
   const [Patients, setPatients] = useState([])
   let navigate = useNavigate()
  async function patients(){
    let{data} = await allPatients()
    setPatients(data.Patient)
   
    console.log(data);
  }
  useEffect(()=>{
   patients()
  },[])

  return<>
   <div className=' m-auto mt-5 w-75'>
     <div className="h-100 bg-opacity-75 bg-light">
   <table className="table table-bordered text-center">
   <thead className="bg-primary bg-opacity-25">
       <tr>
       <th scope="col">#</th>
       <th scope="col">Patient Name</th>
       <th scope="col">Email</th>
       <th scope="col">Age</th>
       <th scope="col"></th>
      
 
     </tr>
 
   </thead>
   <tbody>
 
   {Patients!== null? <> 
   {Patients.map((patient,index)=>(
     
    <tr  key={index} >
       <th key={index+1}  scope="row">{index}</th>
       
     
    
     <td  key={index+5} className='fs-5'>{patient.name}</td>
     <td  key={index+3} className='fs-5'>{patient.email}</td>
     <td  key={index+4} className='fs-5'>{patient.Age}</td>
     <td>
      {patient.HasReport ==true?null: <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
      navigate(`/Nurse/AddVitalSigns/${patient.id}`)
    }}>Add Vital Signs</button>}
     
     <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
      
      navigate(`/Nurse/AllVitalSigns/${patient.id}`)
    }}>View Vital Signs</button>

<button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
      
      navigate(`/Nurse/ViewMedications/${patient.id}`)
    }}>View Medication</button>
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
