import React, { useEffect, useState } from 'react'
import styles from '../ViewDoctors/ViewDoctors.module.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate';

export default function ViewDoctors() {
  const [search, setsearch] = useState('')
  const [doctors, setdoctors] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 
   const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
 
  async function viewDoctors(pageNumber){
    let {data} = await axios.get(`http://localhost:3000/patient/ViewDoctors?currentPage=${pageNumber}`,{
      headers:{token:`${localStorage.getItem('Token')}`}
    })

    setdoctors(data.Doctors);
    setpageCount( Math.ceil(data.totalDoctors / usersPerPage))
     console.log(data);
  }



  const filteredData = doctors.filter((item) =>
  item.Specialization.toLowerCase().includes(search.toLowerCase())
  )
  

  useEffect(()=>{
    viewDoctors(pageNumber);
  },[pageNumber])

const changePage = ({ selected }) => {
  setPageNumber(selected+1);
 console.log(selected);
};
 
  return <>
  <div className="min-vh-100">
  <div className='my-4'> 
   <input type="text"  className='form-control w-50 m-auto ' value={search}
        onChange={(e) =>{ console.log(e.target.value.toLowerCase())
         setsearch(e.target.value)
         }} placeholder='Seacrh with doctor Specialization'/>
</div>
<div className="m-2 mt-5">
  <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered ">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Gender</th>
      <th scope="col">Specialization</th>
      <th scope="col">Experience</th>
      <th scope="col">Day</th>
      <th scope="col">Time</th>
      <th>Booking</th>

    </tr>

  </thead>
  <tbody>

  {filteredData == null? <> 
  {doctors.map((doctor,index)=>(
   <tr key={index} >
      
    <th scope="row">{index}</th>
   
    <td className='fs-5'>{doctors[index].userId.name}</td>
    <td className='fs-5'>{doctors[index].userId.Gender}</td>
    <td className='fs-5'>{doctors[index].Specialization}</td>
    <td className='fs-5'>{doctors[index].Experience }</td>
    <td className='fs-5'>
     <select  className='w-100' id="">
      {(doctors[index].Times.Days).map((day,index)=>(
        <option  className='w-100' value="">
        {day}
      </option>
      ))}
      
    </select>
    </td>

    <td className='fs-5'>
     <select  className='w-100' id="">
      {((doctors[index].Times).Time).map((time,index)=>(
        
        <option  className='w-100' value="">
        {time.from + ' '}{time.to}
      </option>
        
      ))}
 
    </select></td>
    <div className="text-center">
  
    <Link className='btn  btn-outline-primary fw-bold text-black '  to={`/Patient/BookDoctor/${doctor._id}`}><i className="fa-regular fa-calendar-check"></i></Link>
    </div>
     

   </tr>
  ))}
  </>:<>
  {filteredData.map((doctor,index)=>(
   <tr key={index} >
      
    <th scope="row">{index}</th>
   
    <td className='fs-5'>{doctors[index].userId.name}</td>
    <td className='fs-5'>{doctors[index].userId.Gender}</td>
    <td className='fs-5'>{doctors[index].Specialization}</td>
    <td className='fs-5'>{doctors[index].Experience }</td>
    <td className='fs-5'>
     <select  className='w-100' id="">
      {(doctors[index].Times.Days).map((day,index)=>(
        <option  className='w-100' value="">
        {day}
      </option>
      ))}
      
    </select>
    </td>

    <td className='fs-5'>
     <select  className='w-100' id="">
      {((doctors[index].Times).Time).map((time,index)=>(
        
        <option  className='w-100' value="">
        {time.from + ' '}{time.to}
      </option>
        
      ))}
 
    </select></td>
    <div className="text-center">
  
    <Link className='btn  btn-outline-primary fw-bold text-black '  to={`/Patient/BookDoctor/${doctor._id}`}><i className="fa-regular fa-calendar-check"></i></Link>
    </div>
     

   </tr>
  ))}
  </>}
  
  </tbody>
    </table>
    </div>




    <div className=' text-center'  >
         
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
</div>
  </>
}
