import React, { useEffect, useState } from 'react'
import {useFormik } from 'formik'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { NurseContext } from '../../Context/NurseContext';
import { useContext } from 'react';
import img from '../../assets/images/blood-pressure-gauge.png'
import styles from './AllVitalSigns.module.css'
export default function AllVitalSigns() {
  let {viewVitalSigns} = useContext(NurseContext)
  let params = useParams()
  let navigate = useNavigate()
  const [userData, setuserData] = useState([])
  const [nurse, setnurse] = useState([])
  const [result, setresult] = useState([])
  const [time, settime] = useState('')
  const [date, setdate] = useState('')
  async function showVitalSigns(id){
  let {data} = await viewVitalSigns(id)
  setuserData(data.user)
  setnurse(data.result.Nurse)
  setresult(data.result)
  setdate(data.result.updatedAt.slice(0,10))
  settime(data.result.updatedAt.slice(11,16))
  console.log(data);
  }
  useEffect(()=>{
   showVitalSigns(params.id)
  },[])

  return<>
  <div className="h-75 bg-opacity-75 bg-light mt-5 m-auto p-1 rounded">
    <div className='row mt-3 m-auto gy-3'>

    <div className='w-75 m-auto d-flex justify-content-around align-items-center bg-opacity-75 bg-light rounded p-3 '>
    <div className='col-md-4  d-flex '>
          <label className='fw-bold fs-4 ' htmlFor="">Nurse Name:</label>
          <h2 className='h4 mt-1 ms-1'>{nurse.name}</h2>
          </div> 
    <div className='col-md-6 d-flex '>
          <label className='fw-bold fs-4 ' htmlFor="">Update Time:</label>
          <h2 className='h4 mt-1'><span className='ms-1'>{date}</span>
          <span className='ms-2'><span>{(parseInt((Number(time.slice(0,2))) %12))}</span>{time.slice(2,5)}</span>
           </h2>
          </div> 
          </div>

      <div className='w-75 m-auto d-flex justify-content-around align-items-center flex-wrap bg-opacity-75 bg-light rounded p-3 mt-3 mb-2'>
    <div className='col-md-4  d-flex '>
          <label className='fw-bold fs-5 ' htmlFor="">Patient Name:</label>
          <h2 className='h4  ms-1'>{userData.name}</h2>
          </div> 
    <div className='col-md-3 d-flex '>
          <label className='fw-bold fs-5 ' htmlFor="">Patient Age:</label>
          <h2 className='h4 fs-4  ms-1'>{userData.DOB}</h2>
          </div> 
    <div className='col-md-3 d-flex '>
          <label className='fw-bold fs-5 ' htmlFor="">Gender:</label>
          <h2 className='h4 fs-4 ms-1'>{userData.Gender}</h2>
          </div> 

       <div className='col-md-6 d-flex mt-5 justify-content-center'>
           <label className='p-2'>
           <i className="fa-solid fa-temperature-three-quarters fa-2xl "style={{color:'red'}}>
           </i>
           </label>
           <h2 className=''>{result.bodyTemperature}°C</h2>
        </div>   

        <div className='col-md-6 d-flex mt-5 justify-content-start '>

           <i className='w-25 text-end'>
          <img className='mt-2' style={{width:'50%'}}  src={img} alt="image" />
           </i>
           <h2 className='w-75 ms-1 mt-2'>{result.bloodPressure}</h2>
        </div> 

        <div className='col-md-6 d-flex mt-5 justify-content-center mb-5'>
           <label className='p-2 ms-5'>
           <i class="fa-solid fa-heart-pulse fa-2xl"></i>
           </label>
           <h2 className=''>{result.pulseRate}</h2>
        </div> 

        <div className='col-md-6 d-flex mt-5 mb-5'>
           <label className='p-2 ms-5'>
           <i class="fa-solid fa-lungs fa-2xl"></i>
           </label>
           <h2 className=''>{result.respirationRate}</h2>
        </div> 

        <div className='w-75 text-center m-auto'>
   <button onClick={(()=>{
   navigate(`/Nurse/UpdateVitalSigns/${params.id}`)
   })} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Edit</button>

   </div>
          </div>
   
   
       
  </div>
  </div>
  </>
}
