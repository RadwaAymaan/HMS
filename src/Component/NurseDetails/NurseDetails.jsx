import React, { useContext, useEffect, useState } from 'react'
import styles from './NurseDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { NurseContext } from '../../Context/NurseContext';


export default function NurseDetails() {
  let navigate = useNavigate()
  const [Details, setDetails] = useState([])
  const [userData, setuserData] = useState([])
  const [salary, setsalary] = useState([])
  const [day, setday] = useState([])
  const [time, settime] = useState([])
  const [isLoading, setisLoading] = useState(false)
  let parmas = useParams();
   let{nurseDetails} = useContext(NurseContext)
   
   async function viewDetails(id){
    let {data} = await nurseDetails(id)
    setDetails(data.Nurse)
    setuserData(data.Nurse.userId)
    setsalary(data.Nurse.Salary)
    setday([data.Nurse.Times.Days])
    settime([data.Nurse.Times.Time])
    console.log(data);
   }
   useEffect(()=>{
    viewDetails(parmas.id)
   },[])

   function Nurse(editNurse,id){
    navigate(`/Admin/${editNurse}/${id}`)
  }
  
  return<>
     <div className="h-75 bg-opacity-75 bg-light mt-5 m-auto p-1 rounded">
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
          <label className='fw-bold p-2 fs-5' htmlFor="">Days:</label>
        <div className='d-flex flex-wrap'>
        {(day).map((day,index)=>(
         day.map((oneDay)=>{
          return <>
          <h2 className='h4 w-50 p-2'>{oneDay}</h2> <br />
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
      <div className="row mt-4 justify-content-center">
      <div className="col-md-2">
          {isLoading?<button className='btn fw-bold  btn-outline-primary text-black'><i className='fas fa-spinner fa-spin'></i></button>:
         <button onClick={(()=>{Nurse('EditNurse',parmas.id)})} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Edit Nurse</button>}
          </div> 
 
      </div>
     </div>
  
  </>
}
