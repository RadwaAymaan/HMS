import React, { useEffect, useState } from 'react'
import styles from './ViewMedicalHistory.module.css'
import { useContext } from 'react'
import { PatientContext } from '../../Context/PatientContext'
import  jwtDecode  from 'jwt-decode';
export default function ViewMedicalHistory() {
  const [userData, setuserData] = useState([])
  const [data, setdata] = useState([])
  const [inf, setinfo] = useState([])
  const [disease, setdisease] = useState([])
  const [alleg, setalleg] = useState([])
  const [sympt, setsympt] = useState([])
  const [med, setmed] = useState([])
  const [tobac, settobac] = useState([])
  const [illDrug, setillDrug] = useState([])
  const [consuAlchol, setconsuAlchol] = useState([])
  let {showMedicalHistory,patientInfo,patientDisease} = useContext(PatientContext)
  function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    ViewMedicalHistory(decodedToken.id);
    info(decodedToken.id)
    Disease(decodedToken.id)
    setuserData(decodedToken)
  }
  async function info(id) {
    let {data}=await patientInfo(id)
    setinfo(data.info)
    console.log(data);
  }
  async function Disease(id) {
    let {data}=await patientDisease(id)
    console.log(data);
    setdisease(data.Disease)
  }
  async function ViewMedicalHistory(id){
    let {data} = await showMedicalHistory(id)
    console.log(data.data);
    setdata([data.data.Conditions])
    setsympt([data.data.symptoms])
    setalleg(data.data.allergies)
    setmed(data.data.medication)
    settobac(data.data.tobacco)
    setillDrug(data.data.illegalDrugs)
    setconsuAlchol(data.data.consumeAlcohol)

  } 
  useEffect(()=>{
   saveUser()
  },[])
  return <>
  <div className=' bg-opacity-75 bg-light p-3   m-5 rounded'>
    <div className="row m-0">
      <div className="col-md-3 d-flex flex-wrap h-50">
        <div className="p-1 d-flex fs-4 bg-light rounded">
        <i className="fa-solid fa-user  text-primary text-opacity-75 me-1"></i>
        <h3 className='fw-bold text-center text-primary text-opacity-75 h4'>Patient Information</h3>
        </div>
      <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Name:</label>
          <h2 className='h4 p-2'>{inf.name}</h2>
          </div> 

        <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Age:</label>
          <h2 className='h4 p-2'>{inf.DOB}</h2>
          </div> 
          <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Gender:</label>
          <h2 className='h4 p-2'>{inf.Gender}</h2>
          </div> 

        <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Mobile:</label>
          <h2 className='h4 p-2'>0{inf.Mobile}</h2>
          </div>        
      </div>
      <div className="col-md-9">
      <div className="p-1 fs-4 bg-light rounded w-50 ">
        <h3 className='fw-bold text-center text-primary text-opacity-75 h4'>Patient Medical History</h3>
        </div>
      <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Conditions :</label>
          {data.map((val,index)=>(
              val.condType.map((type,index)=>{
              if(type !==' '){
                return <>
                <h2 key={index} className='h4 p-2 border-end border-1 border-dark' >{type}</h2>
                </> 
              }
              if(type == ' '){
               return <h2 key={index} className='h4 p-2 border-end border-1 border-dark' >{val.Condlist}</h2>
                
              }
       })
          ))}
        
          </div> 


          <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Symptoms :</label>
          {sympt.map((val,index)=>(
              val.sympType.map((type,index)=>{
              if(type !==' '){
                return <>
                <h2 key={index} className='h4 p-2 border-end border-1 border-dark' >{type}</h2>
                </> 
              }
              if(type == ' '){
               return <h2 key={index} className='h4 p-2 border-end border-1 border-dark' >{val.symptlist}</h2>
                
              }
       })
          ))}
        
          </div> 

          <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Medication :</label>
              {med.answer === 'yes'?<>
              <h2  className='h4 p-2 border-end border-1 border-dark' >{med.answer}</h2>
              <h2  className='h4 p-2 border-end border-1 border-dark' >{med.mlist}</h2>
              </>: <h2 className='h4 p-2'>{med.answer}</h2>}
          </div> 


          <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Medication Allergies :</label>
              {alleg.reply === 'yes'?<>
              <h2  className='h4 p-2 border-end border-1 border-dark' >{alleg.reply}</h2>
              <h2  className='h4 p-2 border-end border-1 border-dark' >{alleg.allerList}</h2>
              </> :<h2 className='h4 p-2'>{illDrug.reply}</h2>}
          </div> 
    
          <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">kind of tobacco :</label>
              {tobac.choice === 'Yes'?<> 
              <h2  className='h4 p-2 border-end border-1 border-dark' >{tobac.choice}</h2>            
              <h2  className='h4 p-2 border-end border-1 border-dark' >{tobac.Tobacco}</h2>
              </> :<h2 className='h4 p-2'>{tobac.choice}</h2>}
          </div> 
        
          <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor=""> illegal Drugs :</label>
              {illDrug.multiChoice === 'Yes'?<>
              <h2  className='h4 p-2 border-end border-1 border-dark' >{illDrug.multiChoice}</h2>
              <h2  className='h4 p-2 border-end border-1 border-dark' >{illDrug.drugs}</h2>
              </> :<h2 className='h4 p-2'>{illDrug.multiChoice}</h2>}
          </div> 

          <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor=""> ConsumeAlcohol :</label>
          <h2  className='h4 p-2' >{consuAlchol}</h2>
          </div>
        
         
         {disease!==null?<>
          
          <div className='p-1 d-flex border-bottom border-1 border-dark w-100'>
          <label className='fw-bold fs-5 p-2 text-main' htmlFor="">Diseases :</label>
          {disease.map((val,index)=>(
              <h2 key={index} className='h4 p-2 border-end border-1 border-dark' >{val}</h2>
          ))}
        
          </div> 
         
         </>:<span>No disease</span>}


      </div>
    </div>
    </div>
  
  </>
}
