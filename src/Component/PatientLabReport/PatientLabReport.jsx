import React, { useEffect, useState } from 'react'
import styles from './PatientLabReport.module.css'
import { useContext } from 'react'
import { PatientContext } from '../../Context/PatientContext'
export default function PatientLabReport() {
  let {patientLab} = useContext(PatientContext)
  const [report, setreport] = useState([])

  async function Report() {
    let {data}=await patientLab();
    console.log(data);
    setreport(data.LabReport)
    
  }
  useEffect(()=>{
    Report()
   },[])
  return<>
  
  <div className=' m-auto mt-5 '>
     <div className="h-100 bg-opacity-75 bg-light">
   <table className="table table-bordered text-center">
   <thead className="bg-primary bg-opacity-25">
       <tr>
       <th scope="col">#</th>
       <th scope="col">Doctor Name</th>
       <th scope="col">Specialization</th>
       <th scope="col">Radiologist Name</th>
       <th scope="col">Type</th>
       <th scope="col">Price</th>
       <th scope="col">View Report</th>
      
 
     </tr>
 
   </thead>
   <tbody>
 
   {report!== null? <> 
   {report.map((rep,index)=>(
     
    <tr  key={index} >
       <th key={index+1}  scope="row">{index}</th>
       
     
      <td  key={index+5} className='fs-5'>{rep.prescription.doctor.userId.name}</td>
     <td  key={index+3} className='fs-5'>{rep.prescription.doctor.Specialization}</td>
     <td  key={index+2} className='fs-5'>{rep.createdBy.name}</td>
  
     <td key={index+9} className='fs-5'>{rep.type}</td>
     <td key={index+10} className='fs-5'>{rep.price}</td>

    
     <td className='text-center'>
     <button onClick={()=>{
      window.open(`http://localhost:3000/${rep.path}`)
     }}  className='btn  btn-outline-primary fw-bold text-black btn-sm '><i className="fa-regular fa-eye fa-xl"></i></button>
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
