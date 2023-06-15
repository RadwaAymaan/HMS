import React, { useEffect, useState } from 'react'
import styles from './Dashboard.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Bar } from 'react-chartjs-2'
export default function Dashboard() {
  const [data, setdata] = useState([])
  const [bill, setbill] = useState([])
  const [Specialization, setSpecialization] = useState([])
  const [patient, setpatient] = useState([])
  let count = [];
  let arr = [];
  let PatientCount = [];
  Chart.register(CategoryScale);

  async function showDashboard(){
    let {data} = await axios.get(`http://localhost:3000/Admin/Dashboard`,{
      headers:{token:`${localStorage.getItem('Token')}`}
     }).catch((errr)=>{
       
      toast.error(`${errr.response.data.Error}`)
      })
      setdata(data.dashBoard)
      setbill(data.dashBoard.TotalSumOfBills)
      setSpecialization(data.dashBoard.Specialization)
      setpatient(data.dashBoard.PatientInSpecialization)

 
  }
  useEffect(()=>{
   showDashboard()
   
  },[])

  const dataSpecialization = {
    labels: arr,
    datasets: [
      {
        label: 'Doctor Specialization',
        data: count,
        backgroundColor: [
          'rgba(54, 162, 235,0.6)',
          'rgba(255, 99, 132,0.6)',
          'rgba(255, 206, 86,0.6)',
          'rgba(75, 192, 192,0.6)',
          'rgba(153, 102, 255,0.6)',
          'rgba(255, 159, 64,0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
         
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

 
    const Data = {
      labels: arr,
      datasets: [
        {
          label: 'Patient Count For Specialization',
          data: PatientCount,
          backgroundColor: [
            'rgba(255, 120, 132, 0.4)',
            'rgba(54, 100, 235, 0.4)',
            'rgba(255, 206, 86, 0.4)',
            'rgba(100, 192, 192, 0.4)',
            'rgba(153, 90, 255, 0.4)',
            'rgba(255, 159, 90, 0.4)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 100, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 2,
        },
      ],
    }
 

  
  return<>

{Specialization.map((name)=>{
        arr.push(name._id)
        count.push(name.count)
        
      })}
{patient.map((name)=>{
        PatientCount.push(name.countOfPatient)

      })}
<div className='bg-light p-3 bg-opacity-75 mt-2 rounded'>
<div className="row row-cols-1 row-cols-md-2 g-4 ">
<div className="col-md-3 ">
    <div className="card d-flex justify-content-center align-items-center">
      <div className="card-body text-center">
      <i className="fa-solid fa-hospital-user fa-4x text-danger"></i>
        <h2 className="m-2 h4 fw-bold ">{data.NumberOfTotalPatients}</h2>
        <p className="fw-bold fs-4">Patients</p>
      </div>
    </div>
  </div>
  <div className="col-md-3 ">
    <div className="card d-flex justify-content-center align-items-center">
      <div className="card-body text-center">
      <i className="fa-solid fa-user-doctor fa-4x text-primary text-opacity-75"></i>
        <h2 className="m-2 h4 fw-bold ">{data.NumberOfTotalDoctors}</h2>
        <p className="fw-bold fs-4">Doctors</p>
      </div>
    </div>
  </div>
  <div className="col-md-3 ">
    <div className="card d-flex justify-content-center align-items-center">
      <div className="card-body text-center">
      <i className="fa-solid fa-prescription-bottle-medical fa-4x"style={{color:'#3caea3'}}></i>
        <h2 className="m-2 h4 fw-bold ">{data.NumberOfTotalPharmacists}</h2>
        <p className="fw-bold fs-4">Pharmacists</p>
      </div>
    </div>
  </div>
  <div className="col-md-3 ">
    <div className="card d-flex justify-content-center align-items-center">
      <div className="card-body text-center">
      <i className="fa-solid fa-flask-vial fa-4x " style={{color:'#ed553b'}}></i>
        <h2 className="m-2 h4 fw-bold ">{data.NumberOfTotalLaboratoriests}</h2>
        <p className="fw-bold fs-4">Laboratoriests</p>
      </div>
    </div>
  </div>
  <div className="col-md-3 ">
    <div className="card d-flex justify-content-center align-items-center">
      <div className="card-body text-center">
      <i className="fa-solid fa-x-ray fa-4x text-danger"></i>
        <h2 className="m-2 h4 fw-bold ">{data.NumberOfTotalRadiologists}</h2>
        <p className="fw-bold fs-4">Radiologists</p>
      </div>
    </div>
  </div>
  <div className="col-md-3 ">
    <div className="card d-flex justify-content-center align-items-center">
      <div className="card-body text-center">
      <i className="fa-solid fa-user-nurse fa-4x text-primary text-opacity-75"></i>
        <h2 className="m-2 h4 fw-bold ">{data.NumberOfTotalNurses}</h2>
        <p className="fw-bold fs-4">Nurses</p>
      </div>
    </div>
  </div>
  <div className="col-md-3 ">
    <div className="card d-flex justify-content-center align-items-center">
      <div className="card-body text-center">
      <i className="fa-solid fa-file-invoice-dollar fa-4x " style={{color:'#3caea3'}}></i>
        <h2 className="m-2 h4 fw-bold ">{data.NumberOfTotalAccountants}</h2>
        <p className="fw-bold fs-4">Accountants</p>
      </div>
    </div>
  </div>
  <div className="col-md-3 ">
    <div className="card d-flex justify-content-center align-items-center">
      <div className="card-body text-center">
      <i className="fa-solid fa-money-check-dollar fa-4x " style={{color:'#ed553b'}}></i>
      {bill.map((bi)=>(
        <h2 className="m-2 h4 fw-bold ">{bi.count}$</h2>
      ))}
        
        <p className="fw-bold fs-4">Bills</p>
      </div>
    </div>
  </div>
  
  
</div>
<div className='bg-light mt-2 p-2 rounded d-flex'>
  
  <div className='w-50 p-2'>
   <Bar data={dataSpecialization}/>
  </div>


<div className='w-50 p-2'>
<Bar  data={Data} />
</div>

  </div>
  
</div>
  </>
}
