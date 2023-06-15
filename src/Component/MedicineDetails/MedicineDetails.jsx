import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { PharmacistContext } from '../../Context/PharmacistContext';
import styles from './MedicineDetails.module.css'
export default function MedicineDetails() {
  let {medicineDetails}=useContext(PharmacistContext)
  let navigate = useNavigate()
  let parmas = useParams()

  const [Details, setDetails] = useState([])

  async function viewDetails(id){
    let {data} = await medicineDetails(id)
    setDetails(data.Medicines)
    console.log(data);
   }
   useEffect(()=>{
    viewDetails(parmas.id)
   },[])
  
  return<>
  
  <div className="h-75 bg-opacity-75 bg-light mt-5 m-auto p-4 w-75 rounded">
      <div className='row mt-5 m-auto justify-content-around gy-3'>
      <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Medicine name:</label>
          <h2 className='h4 p-2'>{Details.Medicine_name}</h2>
          </div>  
          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Medicine type:</label>
          <h2 className='h4 p-2'>{Details.Medicine_type}</h2>
          </div> 

          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Medicine price:</label>
          <h2 className='h4 p-2'>{Details.Medicine_price}</h2>
          </div>  
          <div className='col-md-5 p-2 d-flex border-bottom border-1 border-dark '>
          <label className='fw-bold p-2 fs-5' htmlFor="">Medicine quantity:</label>
          <h2 className='h4 p-2'>{Details.Medicine_quantity}</h2>
          </div>  

        </div>
        <div className="w-50 p-2 m-auto  text-center mt-5">
          
          <button onClick={()=>{
           navigate(`/Pharmacist/EditMedicine/${parmas.id}`)
          }}   className='btn  btn-outline-primary fw-bold text-black'>Edit Medicine</button>
           </div>  
        </div>
  </>
}
