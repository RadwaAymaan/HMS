import React, { useContext, useEffect, useState } from 'react'
import styles from '../ViewX_rayReport/ViewX_rayReport.module.css'
import ReactPaginate from 'react-paginate';
import { RadiologistContext } from '../../Context/RadiologistContext';
import {  useNavigate } from 'react-router-dom';
export default function ViewXRayReport() {
  let {AllReports}=useContext(RadiologistContext)
  let navigate =useNavigate()
   
  const [Reports, setReports] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  
  async function findReports(page){
    let {data} = await AllReports(page)
    setReports(data.Reports)
    console.log(data);
    setpageCount( Math.ceil(data.totalLapReport / usersPerPage))
    
  }

  useEffect(() => {
    findReports(pageNumber);
  }, [pageNumber]);

  const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  }

  function ReportDetails(id){
    navigate(`/Radiologist/X_rayReportDetails/${id}`)
  }

  return<>
  
  <div className=' m-auto mt-5 w-50 '>
    <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th style={{width:'5%'}} scope="col">#</th>
      <th style={{width:'10%'}} scope="col">Type</th>
      <th style={{width:'10%'}} scope="col">Price</th>
    
      <th style={{width:'10%'}} scope="col">Details</th>

    </tr>

  </thead>
  <tbody>

  {Reports!== null? <> 
  {Reports.map((report,index)=>(
    
   <tr  key={index} >
      <th key={index+1}  scope="row">{index}</th>
      
    
   
    <td key={index+2} className='fs-5 '>{report.type}</td>
   
    <td key={index+9} className='fs-5'>{report.price}</td>

   
    <td className='text-center'>
    <button onClick={()=>{ReportDetails(report._id)}} className='btn  btn-outline-primary fw-bold text-black  '><i className="fa-regular fa-file fa-xl"></i></button>
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
