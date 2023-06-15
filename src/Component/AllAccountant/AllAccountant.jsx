import React, { useContext, useEffect, useState } from 'react'
import styles from './AllAccountant.module.css'
import ReactPaginate from 'react-paginate';
import { AccountantContext } from '../../Context/AccountantContext';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
export default function AllAccountant() {
  let{AllAccountants,removeAccountant} = useContext(AccountantContext)
 
  let navigate =useNavigate()

  const [accountants, setaccountants] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  
  async function findAccountant(page){
    let {data} = await AllAccountants(page)
   setaccountants(data.Accountants)
    console.log(data);
    setpageCount( Math.ceil(data.totalItems / usersPerPage))
    
  }

  useEffect(() => {
    findAccountant(pageNumber);
  }, [pageNumber]);

  const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  }

  function AccountantDetails(id){
    navigate(`/Admin/AccountantDetails/${id}`)
  }

  async  function DeleteAccountant(id,page){
    let {data} = await removeAccountant(id,page)

    findAccountant(pageNumber);
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
      <th scope="col">Email</th>
      <th scope="col">Day</th>
      <th scope="col">Time</th>
      <th scope="col">Delete</th>

    </tr>

  </thead>
  <tbody>

  {accountants!== null? <> 
  {accountants.map((accountant,index)=>(
    
   <tr  key={index} >
      <th key={index+1} className='bg-success bg-opacity-50 ' scope="row">{index}</th>
      
    
   
    <td onClick={()=>{AccountantDetails(accountant._id)}} key={index+2} className='fs-5 cursor-pointer hover'>{accountants[index].userId.name}</td>
    <td key={index+9} className='fs-5'>{accountants[index].userId.email}</td>
 
    <td key={index+5} className='fs-5'>
     <select  className='w-100' id="">
      {(accountants[index].Times.Days).map((day,index)=>(
        <option key={index+7}  className='w-100' value="">
        {day}
      </option>
      ))}
      
    </select>
    </td>

    <td key={index+6} className='fs-5'>
     <select  className='w-100' id="">
      {((accountants[index].Times).Time).map((time,index)=>(
        
        <option key={index+8} className='w-100' value="">
        {time.from + ' '}{time.to}
      </option>
        
      ))}
 
    </select></td>
    <td className='text-center'>
    <button onClick={(()=>{DeleteAccountant(accountant._id,pageNumber)})}  className='btn  btn-outline-danger fw-bold text-black btn-sm w-75'><i className="fa-solid fa-trash-can"></i></button>
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
