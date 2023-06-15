import React, { useState } from 'react'
import {useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { DoctorContext } from '../../Context/DoctorContext';
import { useContext, useEffect } from 'react';
import styles from './AddDisease.module.css'
import { tr } from 'date-fns/locale';
export default function AddDisease() {
  let navigate =useNavigate()
  const [isLoading,setLoading]=useState(false)
  const [messageError,setmessageError]=useState('')
  const [Disease, setDisease] = useState([])
  const [row, setrow] = useState([])
  let{makeDisease,removeDisease} = useContext(DoctorContext)
  let parmas = useParams()

  async function addDisease(id,values){
    let {data} = await makeDisease(id,values)
    
  }

  async function deleteDisease(id,disease,index){
    let{data} = await removeDisease(id,disease)
    console.log(data);
    Disease.splice(index,1)
    if (data.message === 'success')
        {
          
          toast.success('Success message');
          console.log(Disease)
         
          
        }
  }
  let formik = useFormik({ 
    initialValues:
    {
      disease:''
    },onSubmit:((values,{ resetForm })=>{
      setDisease([...Disease,values.disease])
      resetForm({values:''});
      addDisease(parmas.id,values)
    })
  })

 

  return<>
  <div className='w-75 m-auto bg-opacity-75 bg-light p-3 mt-5 m-5 rounded'>
    <h3 className='fw-bold text-center text-primary text-opacity-75 p-2'>Add Disease</h3>
    <form onSubmit={formik.handleSubmit}>
       <div className='d-flex w-75 m-auto mb-5'>
        <div className="w-50">
      <label className='fw-bold' htmlFor="disease">Disease</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="text" name='disease' id='disease' value={formik.values.disease} onChange={formik.handleChange}/>
      {formik.errors.disease && formik.touched.disease ?<div className='alert alert-danger'>{formik.errors.disease}</div>:null}
      </div>

      <div className="w-25 text-center mt-4">
       {isLoading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button  disabled={!(formik.isValid && formik.dirty)} type='submit'  className='btn  btn-outline-primary fw-bold text-black'>Add Disease</button>}
       </div>
       </div>
      </form>
      <table id='myTable' className="table table-bordered w-75 m-auto">
      <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Disease Name</th>
      <th scope="col">Delete</th>
      </tr>
        </thead>
        <tbody>
        {Disease!==null?<>
        {Disease.map((name,index)=>(
         <tr key={index+2}>
         <th key={index} className='bg-success bg-opacity-50' scope="row">{index}</th>
         <td key={index+1} className='fs-5'>{name}</td>
         <td className='text-center'>
    <button onClick={(()=>{deleteDisease(parmas.id,name,index)
   })} className='btn btn-outline-danger fw-bold text-black btn-sm w-75'><i className="fa-solid fa-trash-can"></i></button>
    </td>
         </tr>
        ))}
        </>:null}
        </tbody>
      </table>
    </div>
  </>
}

