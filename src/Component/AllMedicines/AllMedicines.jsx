import React, { useContext, useEffect, useState } from 'react'

import styles from './AllMedicines.module.css'
import ReactPaginate from 'react-paginate';
import { PharmacistContext } from '../../Context/PharmacistContext';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function AllMedicines() {

  let {showMedicines,removeMedicine,setmed}=useContext(PharmacistContext)
let navigate =useNavigate()
  const [medicines, setmedicines] = useState([]);
  const [Searchname, setSearchname] = useState([]);
  const [search, setsearch] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
   const [pageCount, setpageCount] = useState(1) 

  const usersPerPage = 10;
  const pagesVisited = pageNumber * usersPerPage;
  
  async function findMedicine(page){
    let {data} = await showMedicines(page)
    setmedicines(data.Medicines)    
    setpageCount( Math.ceil(data.totalItems / usersPerPage))
    console.log(data)
   
  }

  // async function findAll(){
  //   let {data} = await MedicineSearch()
  //   setSearchname(data.Medicines)    
  // }
  
  const filteredData = medicines.filter((item) =>
  item.Medicine_name.toLowerCase().includes(search.toLowerCase())
  
  )
  
  useEffect(() => {
    
    findMedicine(pageNumber)
   
  }, [pageNumber])
 
  const changePage = ({ selected }) => {
    setPageNumber(selected+1);
   console.log(selected+1);
  };

  
  
 async  function DeleteMedicine(id,page){
   let {data} = await removeMedicine(id,page)
   console.log(data);
   findMedicine(pageNumber);
   if (data.message === 'success')
   {
     toast.success('Success message');
   }
  }
  return<>
  
  <div className='m-auto m-2 mt-5 ' style={{width:'85%'}}>
  <div className='my-4 mt-2'> 
   <input type="text"  className='form-control w-50 m-auto ' value={search}
        onChange={(e) =>{ 
         setsearch(e.target.value)
         }} placeholder='Seacrh with Medicine Name'/>
</div>
    <div className=" bg-opacity-75 bg-light">
  <table className="table table-bordered text-center">
  <thead className="bg-primary bg-opacity-25">
      <tr>
      <th scope="col">#</th>
      <th  scope="col">Medicine name</th>
      <th scope="col">Medicine price</th>
      <th  scope="col">Medicine quantity</th>
      <th scope="col">Update</th>
      <th scope="col">Delete</th>

    </tr>

  </thead>
  <tbody>

  {filteredData.length == 0 ?<> 
  {medicines.map((medicine,index)=>(
    
   <tr  key={index} >
     
      <th key={index+1} className='bg-success bg-opacity-50 ' scope="row">{index}</th>
     
    
   
    <td  key={index+2} className='fs-4'>{medicine.Medicine_name}</td>
    <td key={index+3} className='fs-4'>{medicine.Medicine_price}</td>
    <td key={index+9} className='fs-4'>{medicine.Medicine_quantity}</td>
    
    
    <td className='text-center'>
    <button onClick={(()=>{
      setmed(medicine)
     navigate(`/Pharmacist/EditMedicine/${medicine._id}`)
    })}  className='btn  btn-outline-primary fw-bold text-black  '>Update</button>
    </td>
   
    <td className='text-center'>
    <button onClick={(()=>{DeleteMedicine(medicine._id,pageNumber)})}  className='btn  btn-outline-danger fw-bold text-black w-75'><i className="fa-solid fa-trash-can fa-lg"></i></button>
    </td>

     

   </tr>
  ))}
  </>:<>
  {filteredData.map((medicine,index)=>(
    
    <tr  key={index} >
      
       <th key={index+1} className='bg-success bg-opacity-50 ' scope="row">{index}</th>
      
     
    
     <td  key={index+2} className='fs-4'>{medicine.Medicine_name}</td>
     <td key={index+3} className='fs-4'>{medicine.Medicine_price}</td>
     <td key={index+9} className='fs-4'>{medicine.Medicine_quantity}</td>
     
     
     <td className='text-center'>
     <button onClick={(()=>{
      setmed(medicine)
      navigate(`/Pharmacist/EditMedicine/${medicine._id}`)
     })}  className='btn  btn-outline-primary fw-bold text-black  '>Update</button>
     </td>
    
     <td className='text-center'>
     <button onClick={(()=>{DeleteMedicine(medicine._id,pageNumber)})}  className='btn  btn-outline-danger fw-bold text-black w-75'><i className="fa-solid fa-trash-can fa-lg"></i></button>
     </td>
 
      
 
    </tr>
   ))}
  </>}
  
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
        pageRangeDisplayed={2}
        containerClassName={'pagination'}
        marginPagesDisplayed={2}
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
