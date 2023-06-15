import React, { useState } from 'react'
import {useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { NurseContext } from '../../Context/NurseContext';
import { useContext } from 'react';
import styles from './UpdateRoom.module.css'
export default function UpdateRoom() {
  let navigate =useNavigate()
  let params = useParams()
  const [isLoading,setLoading]=useState(false)
  const [messageError,setmessageError]=useState('')
  let{editRoom,details} = useContext(NurseContext)
  async function updateRoom(id,values){
    setLoading(true)
    let{data} = await editRoom(id,values)
    console.log(data);
    if (data.message === 'success')
    {
      setLoading(false)
      toast.success('Success message');
      
      navigate('/Admin/AllRooms')
    }
  }

  let formik = useFormik({ 
    initialValues:
    {
      RoomType:details.RoomType,
      price:details.price,
  },enableReinitialize:true,
  onSubmit:((values)=>{
   updateRoom(params.id,values)
  })
  })
  return<>
  <div className=' bg-light p-3 bg-opacity-75  mt-5 w-75 m-auto'>
    <h3 className='fw-bold text-center text-primary text-opacity-75 p-2'>Update Room</h3>
    <form onSubmit={formik.handleSubmit} >
      <div className=" d-flex flex-wrap">
        <div className="w-50 p-2 ">
      <label className='fw-bold' htmlFor="RoomType">Room Type</label>
      <select onBlur={formik.handleBlur} className="form-select mb-2 " name="RoomType" id='RoomType'  value={formik.values.RoomType} onChange={formik.handleChange}>
           <option></option>
           <option selected={"General"}>General</option>
           <option value="VIP">VIP</option> 
           <option value="ICCU">ICCU</option> 
       </select>
      </div>
      <div className="w-50 p-2">
      <label className='fw-bold' htmlFor="price">price</label>
      <input onBlur={formik.handleBlur} className='form-control mb-2 ' type="number" name='price' id='price' value={formik.values.price} onChange={formik.handleChange}/>
      </div>
      <div className="p-1 w-75 m-auto text-center">
       {isLoading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Edit Room</button>}
       </div>

      </div>
      </form>
    </div>
  </>
}
