import React, { useEffect, useState } from 'react'
import {useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { RadiologistContext } from '../../Context/RadiologistContext';
import { useContext } from 'react';
import styles from './EditRadiologist.module.css'
export default function EditRadiologist() {
  let navigate =useNavigate()
  const [isLoading,setLoading]=useState(false)
  const [messageError,setmessageError]=useState('')
  const [user, setuser] = useState({})
  const [Salary, setSalary] = useState({})
  const [day, setday] = useState([])
  const [time, settime] = useState([])
  let parmas = useParams()
  let{RadiologistDetails,editRadiologist} = useContext(RadiologistContext)

  async function updateRadiologist(id,values){
    setLoading(true)  
    let {data} = await editRadiologist(id,values);
    console.log(data);
    if (data.message === 'success')
        {
          setLoading(false)
          toast.success('Success message');
          
          navigate(`/Admin/RadiologistDetails/${parmas.id}`)
        }
   }

   async function callRadiologistDetails(id){
    let{data} = await RadiologistDetails(id)
    setuser(data.radiologist.userId)
    setSalary(data.radiologist.Salary)
    setday(data.radiologist.Times.Days)
    settime(data.radiologist.Times.Time)
   
   }
    useEffect(()=>{
      callRadiologistDetails(parmas.id)
    },[])


   let validationSchema=Yup.object({
    name:Yup.string().required('Name is required').min(3,'Name minLenth 3').max(20,'Name maxLenth 20'),
    Mobile:Yup.string().required('Mobile is required').matches(/^01[0125][0-9]{8}$/,"Mobile is invalid"),
    Address:Yup.string().required('Address is required'),
    Days:Yup.array().required('Days is required').min(1,'Please select at least one day'),
    Time:Yup.array().of(
      Yup.object({
        from: Yup.string().required('Start time is required'),
        to: Yup.string().required('End time is required'),
  
      })
    ),
    salary:Yup.number().required('Salare is required')
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
      name:user.name,
      Mobile:'0'+user.Mobile,
      Address:user.Address,
      Days:day,
      Time:time,
      salary:Salary.Salary,
      
   
    
  },validationSchema,
  enableReinitialize:true,
    onSubmit:(values)=>{updateRadiologist(parmas.id,values)}
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
  
  <div className=' bg-opacity-75 bg-light p-3  m-5 '>
    <h3 className='fw-bold text-center text-primary text-opacity-75 p-2'>Update Radiologist</h3>
    {messageError.length>0?<div className='alert alert-danger'>
      {messageError}
    </div>:null}
    
    <form onSubmit={formik.handleSubmit} >
      <div className=" d-flex flex-wrap">
        <div className="w-50 p-2 ">
      <label className='fw-bold' htmlFor="name">Name</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange}/>
      {formik.errors.name && formik.touched.name ?<div className='alert alert-danger'>{formik.errors.name}</div>:null}
      </div>
     
     
      

      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="Mobile">Mobile</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="tel" name='Mobile' id='Mobile' value={formik.values.Mobile} onChange={formik.handleChange}/>
      {formik.errors.Mobile && formik.touched.Mobile ?<div className='alert alert-danger'>{formik.errors.Mobile}</div>:null}
      </div>
 
      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="Address">Address</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='Address' id='Address' value={formik.values.Address} onChange={formik.handleChange}/>
      {formik.errors.Address && formik.touched.Address ?<div className='alert alert-danger'>{formik.errors.Address}</div>:null}
      </div>

      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="salary">salary</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="number" name='salary' id='salary' value={formik.values.salary} onChange={formik.handleChange}/>
      {formik.errors.salary && formik.touched.salary ?<div className='alert alert-danger'>{formik.errors.salary}</div>:null}
      </div>


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
      
      <div className="w-50 ">
      <label className='fw-bold' htmlFor="Time">Time</label>
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

      

     


      <div className="w-50 m-auto p-1 ">
       {isLoading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Edit Radiologist</button>}
       </div>
       
       </div>
    
   
    </form>
  </div>
  </>
}
