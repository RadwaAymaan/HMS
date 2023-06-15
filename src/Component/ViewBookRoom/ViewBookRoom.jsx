import React from 'react'
import styles from './ViewBookRoom.module.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { PatientContext } from '../../Context/PatientContext'
import  jwtDecode  from 'jwt-decode';
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
export default function ViewBookRoom() {
  let{showBookRoom,cancelRoom} = useContext(PatientContext)
  let navigate = useNavigate()
  const [data, setdata] = useState([])
  const [user, setuser] = useState([])
  function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    viewRoom(decodedToken.id)
    setuser(decodedToken.id)
    }
  useEffect(()=>{
    saveUser()
  },[])
  
  async function viewRoom(id){
    let{data} = await showBookRoom(id)
    setdata([data.Room.Room])
    console.log(data);
  }

  async function deleteRoom(patientId,roomId){
    let{data} = await cancelRoom(patientId,roomId)
  
    if (data.message === 'success')
       {
         toast.success('Success message'); 
         navigate('/Patient/ViewRoom')
       }
  }


  return<>
  
  <div className="vh-100 w-50 m-auto">
  <div className="m-2 mt-5">
  <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th style={{width: "5%"}} scope="col">#</th>
      <th style={{width:'20%'}} scope="col">Room Number</th>
      <th style={{width: "20%"}} scope="col">Room Type</th>
      <th style={{width: "20%"}} scope="col">Price</th>
      <th style={{width: "10%"}} scope="col">Book</th>
    
    </tr>

  </thead>
  <tbody>

  {data!== null? <> 
  {data.map((room,index)=>(
   <tr key={index} >
      
      {(room.status)!='true'?<>
      <th key={index+1} className='bg-danger bg-opacity-50' scope="row">{index}</th>
      </>:<>
      <th key={index+1} className='bg-success bg-opacity-50' scope="row">{index}</th>
      </>}
    <td key={index+2} className='fs-5'>{room.numberRoom}</td>  
    <td className='fs-4'>{room.RoomType}</td>
    <td className='fs-4'>{room.price}</td>
    
    <td className='fs-4 text-center'>
      <button className='btn  btn-outline-danger fw-bold text-black' onClick={(()=>{
       deleteRoom(user,room._id)
      })}>Cancel</button>
      </td> 

   </tr>
  ))}
  </>:null}
  
  </tbody>
    </table>
    </div>
    </div>
    </div>
  </>
}
