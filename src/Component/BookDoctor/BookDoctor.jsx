import React, { useEffect, useState } from 'react'
import styles from './BookDoctor.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { getDate } from 'date-fns';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { PatientContext } from '../../Context/PatientContext';
import {    useFormik } from 'formik'
import * as Yup from 'yup'
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';

export default function BookDoctor() {
  const [userData,setUerData]=useState(null)
  const [isLoading, setisLoading] = useState(false)
  let navigate = useNavigate()

  function saveUserData(){
  let encodedToken = localStorage.getItem('Token');
  let decodedToken= jwtDecode(encodedToken);
  setUerData(decodedToken)
  
  }
  const [BookDoctor , setBookDoctor ] = useState(null)
  let parmas = useParams();
  
  let {timeDetails,bookDoctor,checkMedicalHistory} = useContext(PatientContext)

  async function DoctorTime(id){
    
    let {data} =  await timeDetails(id)
    console.log(data.Data);
    setBookDoctor(data.Data.Days)
  }
  useEffect(()=>{
    DoctorTime(parmas.id)
    saveUserData()
  },[])
  
 async function booking(id,userid,values){

  setisLoading(true)
  let {data} =  await bookDoctor(id,userid,values)
  
  if (data.message === 'success')
    {
      setisLoading(false)
      navigate('/Patient/ViewAppointment')
      toast.success('Success message');
    }

  else{
    setisLoading(false)
    toast.error(`${data.Error}`)
  }
    
  }
  let validationSchema=Yup.object({
    date:Yup.object({
      day: Yup.string().required('Day is required'),
    })
  })
  let formik = useFormik({ 
    initialValues:{
    date:{
      day:'',
      selDate:''
    }
    },validationSchema,
    onSubmit:(values)=>{
      booking(parmas.id,userData.id,values)
     }
    
  })
function date(indate){
  const date = dayjs(indate);
  const formattedDate = date.format('MMMM D');
  formik.values.date.selDate=formattedDate;
  console.log(BookDoctor);
}
  const oneWeekFromNow = new Date();
 
  oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
  const isoDate = oneWeekFromNow.toISOString().slice(0,10); // format as "YYYY-MM-DD"

  const today = new Date();
  const isDate = today.toISOString().slice(0,10);
  return <>
  
  <div className=' bg-opacity-75 w-75 m-auto h-75 bg-light p-3  mt-5'>
    <div  className="w-75 m-auto mt-5 ">

  <form onSubmit={formik.handleSubmit} >
  <div className="d-flex flex-wrap" >
 {BookDoctor !==null ?<>
  <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="day"> Day :</label>
     <select onBlur={formik.handleBlur} className="form-select mb-2 " id='date.day' name='date.day'  value={formik.values.date.day} onChange={formik.handleChange}>
     <option >Select Day</option> 
     {BookDoctor.map((day,index)=>(
        <option  className='w-100' value={day}>
      {day}
      </option>
       
      ))}
        
       </select>
       {/* {formik.errors.day && formik.touched.day ?<div className='alert alert-danger'>{formik.errors.day}</div>:null} */}
       </div>
       <div className='w-50 p-2'>
      <label className='fw-bold' htmlFor="date-input">Select a date:</label>
      <input type="date"  className='w-100 form-control mb-2' id="date-input"onChange={(e)=>{date(e.target.value)}}  max={isoDate} defaultValue={isDate} min={isDate}/>
      </div>
 </>:null}
 <div className=" m-auto text-center mt-3">
       {isLoading?<button className='btn fw-bold  btn-outline-primary text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Book</button>}
       </div>
       
 </div>
  </form>
 
  </div>
  </div>
   
</>
}