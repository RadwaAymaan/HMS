import React from 'react'
import styles from './ViewAppointment.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { PatientContext } from '../../Context/PatientContext'
import  jwtDecode  from 'jwt-decode';
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';

export default function ViewAppointment() {
  let{showAppointment,cancel} = useContext(PatientContext)
 const [data, setdata] = useState([]) 
 const [user, setuser] = useState([])
let navigate = useNavigate()
async function cancelBook(id){
  let {data}=await cancel(id)
  console.log(data);
  viewAppointment(user)
  if (data.message === 'success')
       {
         toast.success('Success message'); 
       }

} 

 function saveUser(){
  let encodedToken = localStorage.getItem('Token');
  let decodedToken= jwtDecode(encodedToken);
  viewAppointment(decodedToken.id)
  setuser(decodedToken.id)
  }

 async function viewAppointment(id){
   let {data} = await showAppointment(id)
   setdata(data.Doctor)
   console.log(data)
 }

 useEffect(() => {
  saveUser()
 
}, []); 

  return <>
  <div className="vh-100 w-75 m-auto">
<div className="m-2 mt-5">
  <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col text-center">Doctor Name</th>
      <th scope="col text-center">Specialization</th>
      <th scope="col text-center">Date</th>
      <th scope='col text-center'>Prescription</th>
      <th scope='col text-center'>Cancel</th>
      
    </tr>

  </thead>
  <tbody>

  {data!== null? <> 
  {data.map((doctor,index)=>(
   <tr key={index} >
      
    <th scope="row">{index}</th>
   
    <td className='fs-4'>{doctor.user.userId.name}</td>
    <td className='fs-4'>{doctor.user.Specialization}</td>
    <td className='fs-4'>{doctor.Time.Date}</td>
    <td className='fs-4 text-center'>
      {doctor.findPrescription!==false?<>
        <button className='btn  btn-outline-primary fw-bold text-black' onClick={(()=>{
       navigate('/Patient/PatientPrescription')
      })}>Prescription</button>
      </>:<span>No Prescription</span>}
     
      </td> 
    <td className='fs-4 text-center'>
      {doctor.findPrescription!==true?<>
        <button  className='btn  btn-outline-danger fw-bold text-black' onClick={(()=>{
        cancelBook(doctor.Time._id)
      })}>Cancel</button>
      </>:<button disabled={true} className='btn  btn-outline-danger fw-bold text-black' onClick={(()=>{
        cancelBook(doctor.Time._id)
      })}>Cancel</button>}
      
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
