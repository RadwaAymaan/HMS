import React, { useContext, useEffect, useState } from 'react'
import styles from './AllDoctors.module.css'
import ReactPaginate from 'react-paginate';
import { DoctorContext } from '../../Context/DoctorContext';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AllDoctors() {
let {AllDoctors,removeDoctor}=useContext(DoctorContext)
let navigate =useNavigate()
  const [doctors, setdoctors] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  
  async function findDoctors(page){
    let {data} = await AllDoctors(page)
    setdoctors(data.Doctors)
    setpageCount( Math.ceil(data.totalDoctors / usersPerPage))
    console.log(data.Doctors);
  }
  

  useEffect(() => {
    findDoctors(pageNumber);
  }, [pageNumber]);

  // const pageCount = Math.ceil(NumberOfDoctor / usersPerPage);

 
  const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  };

  function doctorDetails(id){
    navigate(`/Admin/DoctorDetails/${id}`)
  }
  
 async  function DeleteDoctor(id,page){
   let {data} = await removeDoctor(id,page)
   console.log(data);
   findDoctors(pageNumber);
   if (data.message === 'success')
   {
     toast.success('Success message');
   }
  }
  return<>
  
  <div className=' m-2 mt-5 '>
    <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Specialization</th>
      <th scope="col">Experience</th>
      <th scope="col">Day</th>
      <th scope="col">Time</th>
      <th scope="col">Delete</th>

    </tr>

  </thead>
  <tbody>

  {doctors!== null? <> 
  {doctors.map((doctor,index)=>(
    
   <tr  key={index} >
      {(doctors[index].confirmTiming)!='true'?<>
      <th key={index+1} className='bg-danger bg-opacity-50 ' scope="row">{index}</th>
      </>:<>
      <th key={index+1} className='bg-success bg-opacity-50 ' scope="row">{index}</th>
      </>}
    
   
    <td onClick={()=>{doctorDetails(doctor._id)}} key={index+2} className='fs-5 cursor-pointer hover'>{doctors[index].userId.name}</td>
    <td key={index+9} className='fs-5'>{doctors[index].userId.email}</td>
    <td key={index+3} className='fs-5'>{doctors[index].Specialization}</td>
    <td key={index+4} className='fs-5'>{doctors[index].Experience}</td>
    <td key={index+5} className='fs-5'>
     <select  className='w-100' id="">
      {(doctors[index].Times.Days).map((day,index)=>(
        <option key={index+7}  className='w-100' value="">
        {day}
      </option>
      ))}
      
    </select>
    </td>

    <td key={index+6} className='fs-5'>
     <select  className='w-100' id="">
      {((doctors[index].Times).Time).map((time,index)=>(
        
        <option key={index+8} className='w-100' value="">
        {time.from + ' '}{time.to}
      </option>
        
      ))}
 
    </select></td>
    <td className='text-center'>
    <button onClick={(()=>{DeleteDoctor(doctor._id,pageNumber)})}  className='btn  btn-outline-danger fw-bold text-black btn-sm w-75'><i class="fa-solid fa-trash-can"></i></button>
    </td>

     

   </tr>
  ))}
  </>:null}
  
  </tbody>
 </table>
 </div> 
      <div className='mt-5 text-center'  >
         
      <ReactPaginate
      
        breakLabel ={"..."}
        previousLabel={'<<'}
        nextLabel={'>>'}
        pageCount={pageCount}
        onPageChange={changePage}
        pageRangeDisplayed={3}
        containerClassName={'pagination'}
        marginPagesDisplayed={3}
        breakClassName={'page-numbers'}
        activeClassName={"current"}
        nextClassName={"next page-numbers"}
        pageClassName={'page-numbers'}
        previousClassName={"prev page-numbers"}
      />
      </div>
    </div>

  </>
}
