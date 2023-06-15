import React, { useContext, useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { NurseContext } from '../../Context/NurseContext';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './AllRooms.module.css'
export default function AllRooms() {
  let navigate =useNavigate()
  let{AllRooms,removeRoom,setdetails} = useContext(NurseContext)
  const [Rooms, setRooms] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  
  async function findRoom(page){
    let {data}  = await AllRooms(page)
    setRooms(data.Rooms)
    setpageCount( Math.ceil(data.totalRooms / usersPerPage))
    console.log(data.Rooms);
  }
  

  useEffect(() => {
    findRoom(pageNumber);
  }, [pageNumber]);

  const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  };
  
 async  function DeleteRoom(id,page){
   let {data} = await removeRoom(id,page)
   console.log(data);
  findRoom(pageNumber);
   if (data.message === 'success')
   {
     toast.success('Success message');
   }
  }

  return<>
<div className=' m-auto mt-5 w-75'>
    <div className="h-100 bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th style={{width:'15%'}} scope="col">Room Number</th>
      <th scope="col">Room Type</th>
      <th scope="col">Price</th>
      <th scope="col">Status</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>

    </tr>

  </thead>
  <tbody>

  {Rooms!== null? <> 
  {Rooms.map((Room,index)=>(
    
   <tr  key={index} >
    
      <th key={index+1} scope="row">{index}</th>
    
   
    <td key={index+2} className='fs-5'>{Room.numberRoom}</td>
    <td key={index+2} className='fs-5'>{Room.RoomType}</td>
    <td key={index+9} className='fs-5'>{Room.price}</td>
    {Room.status == 'false'?<>
      <td key={index+9} className='fs-5'>
        <div className='bg-success w-50 m-auto text-white bg-opacity-75' style={{height:'30px'}}>
        Available
        </div>
      </td>
    </>:
    <td key={index+9} className='fs-5'>
    <div className='bg-danger  w-50 m-auto text-white' style={{height:'30px'}}>
        Busy
        </div>
        </td>
      }
    
    

    <td className='text-center'>
    <button onClick={(()=>{
      navigate(`/Admin/UpdateRoom/${Room._id}`)
      setdetails(Room)
    })}  className='btn  btn-outline-primary fw-bold text-black btn-sm w-75'>Update</button>
    </td>

    <td className='text-center'>
    <button onClick={(()=>{DeleteRoom(Room._id,pageNumber)})}  className='btn  btn-outline-danger fw-bold text-black btn-sm w-75'><i className="fa-solid fa-trash-can"></i></button>
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
