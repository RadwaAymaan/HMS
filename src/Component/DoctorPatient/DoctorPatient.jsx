import React, { useContext, useEffect, useState } from 'react'
import styles from './DoctorPatient.module.css'
import ReactPaginate from 'react-paginate';
import { DoctorContext } from '../../Context/DoctorContext';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function DoctorPatient() {
let {ShowAllPatient,showpatientDetails}=useContext(DoctorContext)
let navigate =useNavigate()
   const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 
   const [data, setdata] = useState([])
  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  
  async function findpatient(page){
    let {data} = await ShowAllPatient(page)
    setdata(data.Patients)
    // setNumberOfDoctor(data.totalDoctors)
    setpageCount( Math.ceil(data.totalPatients / usersPerPage))
    console.log(data.Patients);
  }
  
 

  useEffect(() => {
    findpatient(pageNumber);
  }, [pageNumber]);


 
  const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  };

  return<>
  
  <div className=' m-auto mt-5 w-75'>
    <div className="h-100 bg-opacity-75 bg-light">
    <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th scope="col">Patient Name</th>
      <th scope="col">Email</th>
      <th scope='col'>Gender</th>

    </tr>

  </thead>
  <tbody>
   
  {data!== null? <> 
  {data.map((Patient,index)=>(
   <tr key={index} >
      
    <th scope="row">{index}</th>
   
    <td onClick={(()=>{
      navigate(`/Doctor/PatientDetails/${Patient._id}`)
    })} className='fs-4 cursor-pointer hover'>{Patient.user.name}</td>
    <td  className='fs-4'>{Patient.user.email}</td>
    <td  className='fs-4'>{Patient.user.Gender}</td>
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
