import React, { useEffect, useState } from 'react'
import styles from './ViewTiming.module.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import  jwtDecode  from 'jwt-decode';
export default function ViewTiming() {

  let [time,setTime]=useState(null);
  let [userId,setUserId]=useState('')
  let navigate = useNavigate()
  let confirm={confirm:"true"}
  let cancel={confirm:"false"}
 
  function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    setUserId(decodedToken.id);
    ViewTiming(decodedToken.id)
    }
    function openLimt(){
      navigate(`/Doctor/Limit`)
    }

  async function ViewTiming(id) {
    let {data} = await axios.get(`http://localhost:3000/Doctor/ViewTiming?userID=${id}`,{
      headers:{token:`${localStorage.getItem('Token')}`}
    }).catch((errr)=>{
      console.log(errr);
      toast.error(`${errr.response.data.Error}`)
    
     })
    setTime(data.Time)
    console.log(data);
  }
 

  async function confirmTiming(id, values){
    let {data}= await axios.post(`http://localhost:3000/Doctor/confirmTiming?userID=${id}`,values,
    {
      headers:{token:`${localStorage.getItem('Token')}`}
    })
    setTime(null)
    ViewTiming(userId);

  }
  
  useEffect(() => {
    saveUser()
   
  }, []); 

  return<>
  
  <table className="table table-bordered w-75 m-auto bg-opacity-75 bg-light mt-5">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Days</th>
      <th scope="col">From</th>
      <th scope="col">TO</th>
    </tr>

  </thead>
  <tbody>
   
    {time !==null?<>
      
     {
      (time.Times.Days).map((day,index)=>(
        <tr key={index}>
        <th scope="row">{index}</th>
        <td className='fs-5'>{time.Times.Days[index]}</td>
        <td className='fs-5'>{time.Times.Time[index].from}</td>
        <td className='fs-5'>{time.Times.Time[index].to}</td>
        
        </tr>

      ))}  
    </>:null}
  </tbody> 
</table>

{time !==null?<>
  <div className="container  m-auto text-center p-2 mt-3  ">
 {time.confirmTiming =='-1'?<> <button onClick={()=>{
          confirmTiming(userId,confirm)
           openLimt()
        }} className='btn fw-bold  m-3 btn-success text-black'>confirm</button>
        <button  onClick={()=>{
          confirmTiming(userId,cancel)
        }} className='btn fw-bold m-3  btn-danger text-black'>cancle</button></>:null}
 </div>

</>:null}
  </>
}
