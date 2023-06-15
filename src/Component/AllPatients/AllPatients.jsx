import React, { useContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { PatientContext } from '../../Context/PatientContext';
import styles from './AllPatients.module.css'
export default function AllPatients() {
  let {allPatients}=useContext(PatientContext)
  let navigate =useNavigate()

  const [patients, setpatients] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  
  async function findPatient(page){
    let {data} = await allPatients(page)
    setpatients(data.Patients)
    console.log(data.Patients);
    setpageCount( Math.ceil(data.totalPatient / usersPerPage))
    
  }

  useEffect(() => {
    findPatient(pageNumber);
  }, [pageNumber]);

  const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  }


 


  return<>
  
  <div className='mt-5 w-75 m-auto'>
    <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Gender</th>
      <th scope="col">Mobile</th>

    </tr>

  </thead>
  <tbody>

  {patients!== null? <> 
  {patients.map((patient,index)=>(
    
   <tr  key={index} >
      <th key={index+1} className='bg-success bg-opacity-50 ' scope="row">{index}</th>
      
    
   
    <td key={index+9} className='fs-5'>{patient.user.name}</td>
    <td key={index+10} className='fs-5'>{patient.user.email}</td>
    <td key={index+10} className='fs-5'>{patient.user.Gender}</td>
    <td key={index+10} className='fs-5'>0{patient.user.Mobile}</td>
 

     

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
