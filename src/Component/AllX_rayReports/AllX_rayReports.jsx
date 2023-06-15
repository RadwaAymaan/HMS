import styles from './AllX_rayReports.module.css'
import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../Context/DoctorContext';
import {  useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import jwtDecode from 'jwt-decode';
export default function AllX_rayReports() {
  let navigate = useNavigate()
  let{showpatientDetails} = useContext(DoctorContext)
  let parmas = useParams()
  const [report, setreport] = useState([])
  const [xray, setxray] = useState([])
  async function PatientDetails(patientId,doctorId){
    let {data} = await showpatientDetails(patientId,doctorId)
    console.log(data);
    setreport(data.data)
    setxray(data.data.X_RayReport)
   }
   function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    PatientDetails(parmas.id,decodedToken.id)
    }
    useEffect(()=>{
    saveUser()
    },[])

  
   return<>
  
   <div className=' m-auto w-50 mt-5 '>
     <div className="h-100 bg-opacity-75 bg-light">
   <table className="table table-bordered">
   <thead className="bg-primary bg-opacity-25">
       <tr>
       <th scope="col">#</th>
       <th scope="col">Radiologist Name</th>
       <th scope="col">Patient Name</th>
       <th scope="col">Type</th>
       <th scope="col">View Report</th>
 
     </tr>
 
   </thead>
   <tbody>
 
   {report!== null? <> 
   {xray.map((rep,index)=>(
     
    <tr  key={index} >
       <th key={index+1}  scope="row">{index}</th>
       
     
    
     <td  key={index+2} className='fs-5'>{rep.createdBy.name}</td>
     <td key={index+9} className='fs-5'>{report.userDetails.name}</td>
     <td key={index+10} className='fs-5'>{rep.type}</td>

    
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
