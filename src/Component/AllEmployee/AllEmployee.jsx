import React, { useContext, useEffect, useState } from 'react'
import styles from './AllEmployee.module.css'
import ReactPaginate from 'react-paginate';
import { EmployeeContext } from '../../Context/EmployeeContext';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'


export default function AllEmployee() {
  let{AllEmployee,removeEmployee} = useContext(EmployeeContext)
  let navigate =useNavigate()

  const [employess, setemployess] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  
  async function findEmployee(page){
    let {data} = await AllEmployee(page)
   setemployess(data.Employee)
    console.log(data);
    setpageCount( Math.ceil(data.totalEmployee / usersPerPage))
    
  }

  useEffect(() => {
    findEmployee(pageNumber);
  }, [pageNumber])

  const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  }

  function employeeDetails(id){
    navigate(`/Admin/EmployeeDetails/${id}`)
  }

  async  function DeleteEmployee(id,page){
    let {data} = await removeEmployee(id,page)

    findEmployee(pageNumber);
    if (data.message === 'success')
    {
      toast.success('Success message');
    }
   }
  return<>
  <div className=' m-2 mt-5 '>
    <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Day</th>
      <th scope="col">Time</th>
      <th scope="col">Delete</th>

    </tr>

  </thead>
  <tbody>

  {employess!== null? <> 
  {employess.map((employee,index)=>(
    
   <tr  key={index} >
      <th key={index+1} className='bg-success bg-opacity-50 ' scope="row">{index}</th>
      
    
   
    <td onClick={()=>{employeeDetails(employee._id)}} key={index+2} className='fs-5 cursor-pointer hover'>{employess[index].name}</td>
 
    <td key={index+5} className='fs-5'>
     <select  className='w-100' id="">
      {(employess[index].Times.Days).map((day,index)=>(
        <option key={index+7}  className='w-100' value="">
        {day}
      </option>
      ))}
      
    </select>
    </td>

    <td key={index+6} className='fs-5'>
     <select  className='w-100' id="">
      {((employess[index].Times).Time).map((time,index)=>(
        
        <option key={index+8} className='w-100' value="">
        {time.from + ' '}{time.to}
      </option>
        
      ))}
 
    </select></td>
    <td className='text-center'>
    <button onClick={(()=>{DeleteEmployee(employee._id,pageNumber)})}  className='btn  btn-outline-danger fw-bold text-black btn-sm w-75'><i className="fa-solid fa-trash-can"></i></button>
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
