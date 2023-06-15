import React, { useContext, useEffect, useState } from 'react'
import styles from './DoctorDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom';

import { DoctorContext } from '../../Context/DoctorContext';


export default function DoctorDetails() {
  let navigate = useNavigate()
  const [Details, setDetails] = useState([])
  const [userData, setuserData] = useState([])
  const [salary, setsalary] = useState([])
  const [day, setday] = useState([])
  const [time, settime] = useState([])
  const [isLoading, setisLoading] = useState(false)
  let parmas = useParams();
  //  console.log(parmas.id);
   let{DoctorDetails} = useContext(DoctorContext)
   
   async function viewDetails(id){
    let {data} = await DoctorDetails(id)
    setDetails(data.Doctor)
    setuserData(data.Doctor.userId)
    setsalary(data.Doctor.Salary)
    setday([data.Doctor.Times.Days])
    settime([data.Doctor.Times.Time])
    console.log(data);
   }
   useEffect(()=>{
    viewDetails(parmas.id)
   },[])

   function Doctor(editDoctor,id){
    navigate(`/Admin/${editDoctor}/${id}`)
  }
  
  return<>
     <div className=" bg-opacity-75 bg-light mt-5 m-auto p-1 rounded">
      <div className='row mt-3 m-auto justify-content-around gy-3'>
         <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Name:</label>
          <h2 className='h4 p-2'>{userData.name}</h2>
          </div>  
          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Email:</label>
          <h2 className='h4 p-2'>{userData.email}</h2>
          </div> 

          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Gender:</label>
          <h2 className='h4 p-2'>{userData.Gender}</h2>
          </div>  
          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Mobile:</label>
          <h2 className='h4 p-2'>0{userData.Mobile}</h2>
          </div>  
          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Address:</label>
          <h2 className='h4 p-2'>{userData.Address}</h2>
          </div>   
          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Salary:</label>
          <h2 className='h4 p-2'>{salary.Salary}</h2>
          </div> 

          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Specialization:</label>
          <h2 className='h4 p-2'>{Details.Specialization}</h2>
          </div> 
          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Experience:</label>
          <h2 className='h4 p-2'>{Details.Experience}</h2>
          </div>  

          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-3 fs-5' htmlFor="">Days:</label>
        <div className='d-flex flex-wrap'>
        {(day).map((day,index)=>(
         day.map((oneDay)=>{
          return <>
          <h2 className='h4 w-50 p-3'>{oneDay}</h2> <br />
          </>
        })
      ))}
     </div> 
    </div>

          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Time:</label>
          <div className='d-flex flex-wrap'>
          {(time).map((time,index)=>(
            time.map((oneTime)=>{
          return<>
          <div className='border border-dark  mt-2'>
          <span className='h4 mb-0 m-2'>{oneTime.from}</span>
            <span className='h4 mb-0 m-2'>{oneTime.to}</span>
            </div>
            </>
        })
      ))}
         </div>
          </div>  
      </div>
      <div className="row mt-5 justify-content-center mb-3">
      <div className="col-md-2">
          {isLoading?<button className='btn fw-bold  btn-outline-primary text-black '><i className='fas fa-spinner fa-spin'></i></button>:
         <button onClick={(()=>{Doctor('EditDoctor',parmas.id)})} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Edit Doctor</button>}
          </div> 

         

          <div className="col-md-2">
          {isLoading?<button className='btn fw-bold  btn-outline-primary text-black'><i className='fas fa-spinner fa-spin'></i></button>:
         <button onClick={(()=>{Doctor('EditTime',parmas.id)})} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Edit Time</button>}
          </div>   
      </div>
     </div>
  
  </>
}
