import React, { useEffect, useState } from 'react'
import styles from './EditTime.module.css'
import { useContext } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import {useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

export default function EditTime() {
  let{time,DoctorDetails} = useContext(DoctorContext)
  let parmas = useParams()
  let navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const [day, setday] = useState([])
  const [tim, settim] = useState([])

  async function Time(id,values){
    setisLoading(true)
   let{data} = await time(id,values)

   console.log(data);
   if (data.message === 'success')
   {
     setisLoading(false)
     toast.success('Success message');
     
     navigate(`/Admin/DoctorDetails/${parmas.id}`)
   }
   

  }
  async function callDoctorDetails(id){
    let{data} = await DoctorDetails(id)
    
    setday(data.Doctor.Times.Days)
    settim(data.Doctor.Times.Time)
    console.log(data.Doctor.userId);
   
   }
   useEffect(()=>{
   callDoctorDetails(parmas.id)
   },[])

  let validationSchema=Yup.object({
    Days:Yup.array().required('Days is required').min(1,'Please select at least one day'),
    Time:Yup.array().of(
      Yup.object({
        from: Yup.string().required('Start time is required'),
        to: Yup.string().required('End time is required'),
  
      })
    ),
  })
  const daysOptions = [
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' },
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
   
  ];
  let formik = useFormik({ 
    initialValues:
    { 
        Days:day,
        Time:tim   
  },enableReinitialize:true
  ,validationSchema,
  onSubmit:(values)=>{Time(parmas.id,values)}
  })

  const addTime = () => {
    formik.setValues({
      ...formik.values,
      Time: [...formik.values.Time, { from: "", to: "" }]
    });
  };
  const delTime = () => {
    formik.setValues({
      ...formik.values,
      Time: [ ],
      
    });
    
  };
  
  return<>
   <div className=' bg-opacity-75 bg-light p-3  mt-5 w-75 m-auto h-50 '>
   <h3 className='fw-bold text-center text-primary text-opacity-75 p-2 '>Edit Time</h3>
   <form onSubmit={formik.handleSubmit} >
   <div className=" d-flex flex-wrap justify-content-around">
   <div className="w-50 p-2">
      <label className='fw-bold m-2' htmlFor="Days">Days </label>
    
          <div className='checkbox-container w-50 m-2'>
          {daysOptions.map(({ value, label }) => (
          <label key={value} className='checkbox-label'>
            <input type="checkbox" name="Days"  onBlur={formik.handleBlur} value={value} checked={formik.values.Days.includes(value)} onChange={formik.handleChange} id='Days'/>
            <span className="checkbox-value">{label}</span>
          </label>
        ))}
        </div>

      {formik.errors.Days && formik.touched.Days ?<div className='alert alert-danger'>{formik.errors.Days}</div>:null}
      </div>
      
      <div className="w-50 p-2">
      <label className='fw-bold m-2' htmlFor="Time">Time</label>
      {formik.values.Time.map((Time, index) => (
        <div className='d-flex m-2' key={index}>
          <div className='w-50'>
            <label className='fw-bold p-2' htmlFor={`Time.${index}.from`}>From </label>
            <input type="time" id={`Time.${index}.from`} name={`Time.${index}.from`} onChange={formik.handleChange} value={formik.values.Time[index].from} />
            {formik.touched.Time && formik.errors.Time?.[index]?.from ? <div>{formik.errors.Time[index].from}</div> : null}
          </div>
          <div className='w-50'>
            <label className='fw-bold p-2'  htmlFor={`Time.${index}.to`}>To </label>
            <input type="time" id={`Time.${index}.to`} name={`Time.${index}.to`} onChange={formik.handleChange} value={formik.values.Time[index].to} />
            {formik.touched.Time && formik.errors.Time?.[index]?.to ? <div>{formik.errors.Time[index].to}</div> : null}
          </div>
        </div>
      ))}
     <div className="text-center">
      <button type="button" className='btn btn-outline-primary fw-bold text-black m-2' onClick={addTime}>Add Time</button>
      <button type="button" className='btn btn-outline-primary fw-bold text-black m-2' onClick={delTime}>Delete Time</button>
      </div>
      </div>
      <div className="mx-5 p-1 text-center m-auto  w-75">
       {isLoading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>EditTime</button>}
       </div>
    </div>
    </form>
   </div>
  </>
}
