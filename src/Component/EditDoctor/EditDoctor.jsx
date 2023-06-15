import React, { useEffect, useState } from 'react'
import {    useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { DoctorContext } from '../../Context/DoctorContext';
import { useContext } from 'react';


export default function EditDoctor() {
  let navigate =useNavigate()
  const [isLoading,setLoading]=useState(false)
  const [messageError,setmessageError]=useState('')
  let{editDoctor,DoctorDetails} = useContext(DoctorContext)
  const [Doctor, setDoctor] = useState({})
  const [user, setuser] = useState({})
  const [Salary, setSalary] = useState({})
  const [day, setday] = useState([])
  const [time, settime] = useState([])
  
  
  
  let parmas = useParams()


  async function updateDoctor(id,values){
   setLoading(true)  
   let {data} = await editDoctor(id,values)
  
   console.log(data);
   if (data.message === 'success')
       {
         setLoading(false)
         toast.success('Success message');
         
         navigate(`/Admin/DoctorDetails/${parmas.id}`)
       }
    
  }
  async function callDoctorDetails(id){
   let{data} = await DoctorDetails(id)
   setDoctor(data.Doctor)
   setuser(data.Doctor.userId)
   setSalary(data.Doctor.Salary)
   setday(data.Doctor.Times.Days)
   settime(data.Doctor.Times.Time)
   console.log(data.Doctor.userId);
  
  }
   useEffect(()=>{
    callDoctorDetails(parmas.id)
   },[])
  // callDoctorDetails(parmas.id)
  let validationSchema=Yup.object({
    name:Yup.string().required('Name is required').min(3,'Name minLenth 3').max(20,'Name maxLenth 20'),
    Mobile:Yup.string().required('Mobile is required').matches(/^01[0125][0-9]{8}$/,"Mobile is invalid"),
    Address:Yup.string().required('Address is required'),
    Specialization:Yup.string().required('Specialization is required'),
    Experience:Yup.string().required('Experience is required'),
    Language:Yup.string().required('Language is required'),
    salary:Yup.number().required('Salare is required')
  })
  


  let formik = useFormik({ 
    initialValues :{
      name:user.name,
      Mobile:'0'+user.Mobile,
      Address:user.Address,
      Specialization:Doctor.Specialization,
      Experience:Doctor.Experience,
      Language:Doctor.Language,
      salary:Salary.Salary,
  },enableReinitialize:true,
  validationSchema,
  onSubmit:(values)=>{updateDoctor(parmas.id,values)}
  })

  return<>
  <div className=' bg-opacity-75 bg-light p-3  m-5 rounded'>
    <h3 className='fw-bold text-center text-primary text-opacity-75 p-2'>Edit Doctor</h3>
    {messageError.length>0?<div className='alert alert-danger'>
      {messageError}
    </div>:null}
    
    <form onSubmit={formik.handleSubmit} >
      <div className=" d-flex flex-wrap m-auto">
        <div className="w-25 p-3  ">
      <label className='fw-bold' htmlFor="name">Name</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange}/>
      {formik.errors.name && formik.touched.name ?<div className='alert alert-danger'>{formik.errors.name}</div>:null}
      </div>

      <div className="w-25 p-3  ">
      <label className='fw-bold' htmlFor="Mobile">Mobile</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="tel" name='Mobile' id='Mobile' value={formik.values.Mobile} onChange={formik.handleChange}/>
      {formik.errors.Mobile && formik.touched.Mobile ?<div className='alert alert-danger'>{formik.errors.Mobile}</div>:null}
      </div>

      <div className="w-25 p-3  ">
      <label className='fw-bold' htmlFor="Address">Address</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='Address' id='Address' value={formik.values.Address} onChange={formik.handleChange}/>
      {formik.errors.Address && formik.touched.Address ?<div className='alert alert-danger'>{formik.errors.Address}</div>:null}
      </div>


      <div className="w-25 p-3  ">
      <label className='fw-bold' htmlFor="Specialization">Specialization</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='Specialization' id='Specialization' value={formik.values.Specialization} onChange={formik.handleChange}/>
      {formik.errors.Specialization && formik.touched.Specialization ?<div className='alert alert-danger'>{formik.errors.Specialization}</div>:null}
      </div>

      <div className="w-25 p-3  ">
      <label className='fw-bold' htmlFor="Experience">Experience</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='Experience' id='Experience' value={formik.values.Experience} onChange={formik.handleChange}/>
      {formik.errors.Experience && formik.touched.Experience ?<div className='alert alert-danger'>{formik.errors.Experience}</div>:null}
      </div>

      <div className="w-25 p-3  ">
      <label className='fw-bold' htmlFor="Language">Language</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='Language' id='Language' value={formik.values.Language} onChange={formik.handleChange}/>
      {formik.errors.Language && formik.touched.Language ?<div className='alert alert-danger'>{formik.errors.Language}</div>:null}
      </div>

      <div className="w-25 p-3 ">
      <label className='fw-bold' htmlFor="salary">salary</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="number" name='salary' id='salary' value={formik.values.salary} onChange={formik.handleChange}/>
      {formik.errors.salary && formik.touched.salary ?<div className='alert alert-danger'>{formik.errors.salary}</div>:null}
      </div>   
      </div>

      <div className="mx-5 p-1 text-center">
       {isLoading?<button className='btn btn-outline-primary  text-black '><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Update</button>}
       </div>
       </form>
       </div>
  </>
}
