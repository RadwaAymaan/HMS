
import styles from './LabReportDetails.module.css'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { LaboratoriestContext } from '../../Context/LaboratoriestContext';
import { toast } from 'react-toastify';

export default function LabReportDetails() {
  let {removeReport,ReportDetails}=useContext(LaboratoriestContext)
  let navigate = useNavigate()
  let parmas = useParams()
  const [report, setreport] = useState([])
  const [check, setcheck] = useState([])
  async function viewDetails(id){
    let {data} = await ReportDetails(id)
    console.log(data);
    setcheck([data.checkOut])
    console.log(check);
    setreport([data.Reports])
   }
   useEffect(()=>{
    viewDetails(parmas.id)
   },[])

   async  function DeleteReport(id){
    let {data} = await removeReport(id)
    if (data.message === 'success')
    {
      toast.success('Success message')
      navigate('/Labotariest/ViewLabReport')
    }
   }
  
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
       <th scope="col">Delete</th>
 
     </tr>
 
   </thead>
   <tbody>
 
   {report!== null? <> 
   {report.map((rep,index)=>(
     
    <tr  key={index} >
       <th key={index+1}  scope="row">{index}</th>
       
     
    
     <td  key={index+2} className='fs-5'>{rep.createdBy.name}</td>
     <td key={index+9} className='fs-5'>{rep.Patient.name}</td>
     <td key={index+10} className='fs-5'>{rep.type}</td>

    
     <td className='text-center'>
     <button onClick={()=>{
      window.open(`http://localhost:3000/${rep.path}`)
     }}  className='btn  btn-outline-primary fw-bold text-black btn-sm '><i className="fa-regular fa-eye fa-xl"></i></button>
     </td>
     <td className='text-center'>
      {check=='true'?<>
        <button disabled={true} onClick={(()=>{DeleteReport(rep._id)})}  className='btn  btn-outline-danger fw-bold text-black  '><i className="fa-solid fa-trash-can"></i></button>
         </>:     <button onClick={(()=>{DeleteReport(rep._id)})}  className='btn  btn-outline-danger fw-bold text-black  '><i className="fa-solid fa-trash-can"></i></button>}
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
