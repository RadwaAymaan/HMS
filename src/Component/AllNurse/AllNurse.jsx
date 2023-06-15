import React, { useContext, useEffect, useState } from 'react'
import styles from './AllNurse.module.css'
import ReactPaginate from 'react-paginate';
import { NurseContext } from '../../Context/NurseContext';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function AllNurse() {
  let navigate =useNavigate()
  let{AllNurses,removeNurse} = useContext(NurseContext)
  const [Nurses, setNurses] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  
  async function findNurses(page){
    let {data}  = await AllNurses(page)
    setNurses(data.Nurses)
    setpageCount( Math.ceil(data.totalNurses / usersPerPage))
    console.log(data.Nurses);
  }
  

  useEffect(() => {
    findNurses(pageNumber);
  }, [pageNumber]);

  // const pageCount = Math.ceil(NumberOfDoctor / usersPerPage);

 
  const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  };

  function nurseDetails(id){
    navigate(`/Admin/NurseDetails/${id}`)
  }
  
 async  function DeleteNurse(id,page){
   let {data} = await removeNurse(id,page)
   console.log(data);
  findNurses(pageNumber);
   if (data.message === 'success')
   {
     toast.success('Success message');
   }
  }

  return<>
  
  <div className=' m-auto mt-5 '>
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

  {Nurses!== null? <> 
  {Nurses.map((Nurse,index)=>(
    
   <tr  key={index} >
      
      <th key={index+1} className='bg-success bg-opacity-50 ' scope="row">{index}</th>
    
   
    <td onClick={()=>{nurseDetails(Nurse._id)}} key={index+2} className='fs-5 cursor-pointer hover'>{Nurses[index].userId.name}</td>
    <td key={index+9} className='fs-5'>{Nurses[index].userId.email}</td>
    <td key={index+5} className='fs-5'>
     <select  className='w-100' id="">
      {(Nurses[index].Times.Days).map((day,index)=>(
        <option key={index+7}  className='w-100' value="">
        {day}
      </option>
      ))}
      
    </select>
    </td>

    <td key={index+6} className='fs-5'>
     <select  className='w-100' id="">
      {((Nurses[index].Times).Time).map((time,index)=>(
        
        <option key={index+8} className='w-100' value="">
        {time.from + ' '}{time.to}
      </option>
        
      ))}
 
    </select></td>
    <td className='text-center'>
    <button onClick={(()=>{DeleteNurse(Nurse._id,pageNumber)})}  className='btn  btn-outline-danger fw-bold text-black btn-sm w-75'><i className="fa-solid fa-trash-can"></i></button>
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
