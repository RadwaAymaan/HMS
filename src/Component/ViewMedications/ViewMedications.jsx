import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { NurseContext } from '../../Context/NurseContext';
import styles from './ViewMedications.module.css'
export default function ViewMedications() {
  let parmas = useParams()
  let{viewMedicines} = useContext(NurseContext)
  const [Medicine, setMedicine] = useState([])
  let navigate = useNavigate()
 async function patientMedicine(id){
   let{data} = await viewMedicines(id)
   setMedicine(data.medication)
 }
 useEffect(()=>{
  patientMedicine(parmas.id)
 },[])
  return<>
   <div className=' m-auto mt-5 w-50'>
     <div className="h-100 bg-opacity-75 bg-light">
   <table className="table table-bordered text-center">
   <thead className="bg-primary bg-opacity-25">
       <tr>
       <th scope="col">#</th>
       <th scope="col">Doctor Name</th>
       <th scope="col">Patient Name</th>
       <th scope="col">Medicines</th>
       
      
 
     </tr>
 
   </thead>
   <tbody>
 
   {Medicine!== null? <> 
   {Medicine.map((med,index)=>(
     
    <tr  key={index} >
       <th key={index+1}  scope="row">{index}</th>
       
     
    
     <td  key={index+5} className='fs-5'>{med.doctor.name}</td>
     <td  key={index+3} className='fs-5'>{med.Patient.name}</td>
     <td  key={index+4} className='fs-5'>{med.Medication[index].value}</td>
    
      
 
    </tr>
   ))}
   </>:null}
   
   </tbody>
 

  
  </table>
  </div> 
  </div>
  </>
}
