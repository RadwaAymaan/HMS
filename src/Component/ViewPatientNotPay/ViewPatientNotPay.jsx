import React, { useContext, useEffect, useState } from 'react'
import { AccountantContext } from '../../Context/AccountantContext';
import {  useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import styles from './ViewPatientNotPay.module.css'
export default function ViewPatientNotPay() {
  let{notPay} = useContext(AccountantContext)
  let navigate =useNavigate()
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 
   const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  const [patients, setpatients] = useState([]);

  async function patientNotPay(page){
    let {data} = await notPay(page)
    setpatients(data.Patients)
    console.log(data);
    setpageCount( Math.ceil(data.totalItems / usersPerPage))
  }
  useEffect(() => {
   patientNotPay(pageNumber)
  }, [pageNumber])
  
  const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  }

  return<>
  <div className="w-75  m-auto">
  <div className="m-2 mt-5">
  <div className=" bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th  scope="col">#</th>
      <th  scope="col">Patient Name</th>
      <th  scope="col">Email</th>
      <th scope="col">Gender</th>
      <th scope="col">Final Price</th>
      <th scope="col">Cash Payment</th>
    
    </tr>

  </thead>
  <tbody>

  {patients!== null? <> 
  {patients.map((patient,index)=>(
   <tr key={index} >
      
      <th key={index+1} scope="row">{index}</th>
    
    <td className='fs-4'>{patient.user.name}</td>
    <td className='fs-4'>{patient.user.email}</td>
    <td className='fs-4'>{patient.user.Gender}</td>
    <td className='fs-4'>{patient.finalPrice}</td>
    <td className='fs-4'>
    <button className='btn m-1 btn-sm btn-outline-primary fw-bold text-black' onClick={()=>{
        navigate(`/Accountant/PatientOrder/${patient._id}`) 
    }}>Pay Now</button>
    </td>
    
    

   </tr>
  ))}
  </>:null}
  
  </tbody>
    </table>
    </div>
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
