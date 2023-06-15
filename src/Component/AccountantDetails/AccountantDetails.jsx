import React, { useContext, useEffect, useState } from 'react'
import styles from './AccountantDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AccountantContext } from '../../Context/AccountantContext';
export default function AccountantDetails() {
  let navigate = useNavigate()
  let parmas = useParams()
  let{AccountantDetails} = useContext(AccountantContext)
  const [Details, setDetails] = useState([])
  const [userData, setuserData] = useState([])
  const [salary, setsalary] = useState([])
  const [day, setday] = useState([])
  const [time, settime] = useState([])


  async function viewDetails(id){
    let {data} = await AccountantDetails(id)
    setDetails(data.Accountant)
    setuserData(data.Accountant.userId)
    setsalary(data.Accountant.Salary)
    setday([data.Accountant.Times.Days])
    settime([data.Accountant.Times.Time])
    console.log(data);
   }
   useEffect(()=>{
    viewDetails(parmas.id)
   },[])
  return<>
  <div className="bg-opacity-75 bg-light mt-5 m-auto p-3 rounded">
      <div className='row mt-3 m-auto justify-content-around gy-3 '>
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

          <div className='col-md-5 p-2 d-flex  border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Time:</label>
          <div className='d-flex flex-wrap '>
          {(time).map((time,index)=>(
            time.map((oneTime)=>{
          return<>
          <div className='border border-dark  mt-2 me-1'>
          <span className='h4 mb-0 m-2'>{oneTime.from}</span>
          <span className='h4 mb-0 m-2'>{oneTime.to}</span>
            </div>
            </>
        })
      ))}
         </div>
          </div> 

         
    
      </div>
      
      <div className="w-50 p-2 m-auto  text-center mt-5">
          
         <button onClick={()=>{
          navigate(`/Admin/EditAccountant/${parmas.id}`)
         }}   className='btn  btn-outline-primary fw-bold text-black'>Edit Accountant</button>
          </div>  
      
     </div>
  </>
}
