import React, { useContext, useEffect, useState } from 'react'
import styles from './ViewPatientPay.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AccountantContext } from '../../Context/AccountantContext';
import ReactPaginate from 'react-paginate';
export default function ViewPatientPay() {
  let navigate = useNavigate()
  const [patients, setpatients] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 
   const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  let{Pay,setnum,setpagenum} = useContext(AccountantContext)

  async function showPay(page){
    let {data} = await Pay(page)
    setpatients(data.Patients)
    console.log(data);
    setpageCount( Math.ceil(data.totalItems / usersPerPage))
  }
  useEffect(()=>{ 
    showPay(pageNumber)
   },[pageNumber])

   const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  }
  return<>
  
 <div className="w-75  m-auto ">
  <div className=" m-2 mt-5">
  <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th  scope="col">#</th>
      <th  scope="col">Patient Name</th>
      <th  scope="col">Email</th>
      <th scope="col">Gender</th>
      <th scope="col">Final Price</th>
      <th scope="col">Payment Type</th>
    
    </tr>

  </thead>
  <tbody>

  {patients!== null? <> 
  {patients.map((patient,index)=>(
   <tr key={index} >
      
      <th key={index+1} scope="row">{index}</th>
    
    <td className='fs-4 cursor-pointer hover' onClick={()=>{
      setnum(index)
      setpagenum(pageNumber)
      navigate(`/Accountant/PayDetails`)}}>{patient.user.name}</td>
    <td className='fs-4'>{patient.user.email}</td>
    <td className='fs-4'>{patient.user.Gender}</td>
    <td className='fs-4'>{patient.finalPrice}</td>
    <td className='fs-4'>{patient.paymentType}</td>
    
    

   </tr>
  ))}
  </>:null}
  
  </tbody>
    </table>
    </div>
    
    <div className='mt-4 text-center'  >
         
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
