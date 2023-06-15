import React, { useEffect, useState } from 'react'
import styles from './AddMedicalHistory.module.css'
import {    useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { DoctorContext } from '../../Context/DoctorContext';
import { useContext } from 'react';
import jwtDecode from 'jwt-decode';

export default function AddMedicalHistory() {
  let param =useParams() 
  const [user, setuser] = useState([])
  const [isLoading,setLoading]=useState(false)
   let navigate =useNavigate()
  let{MakeMedicalHistory} = useContext(DoctorContext)
  let cOther = document.getElementById('cOther')
  let sOther = document.getElementById('sOther')
  let List = document.getElementById('List')
  let allegList = document.getElementById('allegList')
  let tobaco = document.getElementById('tobaco')
  let illegDrugs = document.getElementById('illegDrugs')

  function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    setuser(decodedToken.id);
  }
 
  async function AddMedicalHistory(id,values){
    setLoading(true)
   let {data} = await MakeMedicalHistory(id,values)
   if (data.message === 'success')
    {
      setLoading(false)
      toast.success('Success message');
      navigate('/Doctor/Appointment')
    }
  }
  
  useEffect(()=>{
  saveUser()
  },[])
  
  const conditions = [
    { value: 'Asthma', label: 'Asthma' },
    { value: 'Cancer', label: 'Cancer' },
    { value: 'Cardiac disease', label: 'Cardiac disease' },
    { value: 'Diabetes', label: 'Diabetes' },
    { value: 'Hypertension', label: 'Hypertension' },
    { value: 'Psychiatric disorder', label: 'Psychiatric disorder' },
    { value: 'Epilepsy', label: 'Epilepsy' },
    { value: ' ', label: 'Other' },
  ];

  const Symptoms = [
    { value: 'Chest pain', label: 'Chest pain' },
    { value: 'Respiratory', label: 'Respiratory' },
    { value: 'Cardiac disease', label: 'Cardiac disease' },
    { value: 'Cardiovascular', label: 'Cardiovascular' },
    { value: 'Hypertension', label: 'Hypertension' },
    { value: 'Hematological', label: 'Hematological' },
    { value: 'Lymphatic', label: 'Lymphatic' },
    { value: 'Neurological', label: 'Neurological' },
    { value: 'Psychiatric', label: 'Psychiatric' },
    { value: 'Gastrointestinal', label: 'Gastrointestinal' },
    { value: 'Genitourinary', label: 'Genitourinary' },
    { value: 'Weight gain', label: 'Weight gain' },
    { value: 'Weight loss', label: 'Weight loss' },
    { value: 'Musculoskeletal', label: 'Musculoskeletal' },
    { value: ' ', label: 'Other' },
  ];
  const ConsumeAlcohol = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Occasionally', label: 'Occasionally' },
    { value: 'Never', label: 'Never' } 
  ];
  const Answer = [
    {value:'yes',label:'yes'},
    {value:'No',label:'No'}
  ]
  
  let formik = useFormik({ 
    initialValues:
    {
      Conditions:{
       condType :[],
       Condlist:''
      },
       symptoms:{
       sympType:[],
       symptlist:''
       },
       consumeAlcohol:[],
      medication:{
        mlist:[],
        answer:'',
       
      },
      allergies:{
        reply:'',
        allerList:[]
      },
      tobacco:{
        choice:'',
        Tobacco:[],
      },
      illegalDrugs:{
        multiChoice:'',
        drugs:[]
      },

  },
  onSubmit:((values)=>{
  AddMedicalHistory(param.id,values)
  })
  })

  formik.values.Conditions.condType.map((val)=>{
   
      if(val ===  ' '){
        cOther.classList.replace('d-none','d-block')
      }
      if(val !==  ' '){
       cOther.classList.replace('d-block','d-none')
      }
 

    })

   formik.values.symptoms.sympType.map((val)=>{
    if(val ===  ' '){
      sOther.classList.replace('d-none','d-block')
    }
    if(val != ' '){
     sOther.classList.replace('d-block','d-none')
    }
    }) 

    
      if(formik.values.medication.answer ===  "yes"){
        List.classList.replace('d-none','d-block')
      }
       if(formik.values.medication.answer ==  'No' ){
        List.classList.replace("d-block","d-none")
      } 

      if(formik.values.allergies.reply ===  "yes"){
        allegList.classList.replace('d-none','d-block')
      }
       if(formik.values.allergies.reply ==  'No' ){
        allegList.classList.replace("d-block","d-none")
      } 

      if(formik.values.tobacco.choice ===  "Yes"){
        tobaco.classList.replace('d-none','d-block')
      }
       if(formik.values.tobacco.choice ==  'No' ){
        tobaco.classList.replace("d-block","d-none")
      } 
      if(formik.values.illegalDrugs.multiChoice ===  "Yes"){
        illegDrugs.classList.replace('d-none','d-block')
      }
       if(formik.values.illegalDrugs.multiChoice ==  'No' ){
        illegDrugs.classList.replace("d-block","d-none")
      } 
  return<>
  
   <div className=' bg-opacity-75 bg-light p-3 mt-3 mb-5'>
   <h3 className='fw-bold text-center text-primary text-opacity-75 p-2'>Medical History</h3>
   <form onSubmit={formik.handleSubmit} >
      <div className=" d-flex flex-wrap w-100">

      <div className="p-2 w-75 m-auto">
      <label className='fw-bold m-2' htmlFor="Conditions">Conditions </label>
    
          <div className='checkbox-container  m-2'>
          {conditions.map(({ value, label }) => (
          <label key={value} className='checkbox-label'>
            <input type="checkbox" name="Conditions.condType"  onBlur={formik.handleBlur} value={value}  onChange={formik.handleChange} id='Conditions.condType'/>
            <span className="checkbox-value">{label}</span>
          </label>
        ))}
        </div>   
   <div className="w-100 d-none" id='cOther'>
    <input type="text" onBlur={formik.handleBlur} placeholder='Please type another option here' className='form-control' name='Conditions.Condlist' id='Conditions.Condlist'  onChange={formik.handleChange}/>
   </div>
      </div>
      
      <div className="p-2 w-75 m-auto d-flex flex-wrap">
      <label className='fw-bold m-2 w-100' htmlFor="symptoms">Symptoms </label>

          <div className='checkbox-container  m-2'>
            
          {Symptoms.map(({ value, label }) => (
          <label key={value} className='' style={{width:'30%'}}>
            <input type="checkbox" name="symptoms.sympType"  onBlur={formik.handleBlur} value={value}  onChange={formik.handleChange} id='symptoms.sympType'/>
            <span className="checkbox-value">{label}</span>
          </label>
        ))}
      
        </div>   
   <div className="w-100 d-none" id='sOther'>
    <input type="text" onBlur={formik.handleBlur} placeholder='Please type another option here' className='form-control' name='symptoms.symptlist' id='symptoms.symptlist'  onChange={formik.handleChange}/>
   </div>
    
      </div>

    <div className="w-75 m-auto d-flex flex-wrap">

      <div className="p-2 w-50 m-auto  ">
      <label className='fw-bold m-2' htmlFor="medication">Are you currently taking any medication? </label>

          <div className='checkbox-container w-50 m-2'>
          {Answer.map((option) => (
          <label key={option.value} className='checkbox-label'>
            <input type="radio" name="medication.answer"  onBlur={formik.handleBlur} value={option.value}  onChange={formik.handleChange} id='medication.answer'/>
            <span className="m-1 check-input">{option.label}</span>
          </label>
        ))}
        </div>   
   <div className="w-50 d-none" id="List">
   <label className='fw-bold m-2' htmlFor="medication.mlist">Please list them. </label>
    
    <textarea className="form-control" name="medication.mlist" id="medication.mlist"  onChange={formik.handleChange}
        onBlur={formik.handleBlur} cols="80" rows="5"/>
   </div>

    
      </div>

      <div className="p-2 w-50 m-auto  ">
      <label className='fw-bold m-2' htmlFor="allergies">Do you have any medication allergies? </label>

          <div className='checkbox-container w-50 m-2'>
          {Answer.map((option) => (
          <label key={option.value} className='checkbox-label'>
            <input type="radio" name="allergies.reply"  onBlur={formik.handleBlur} value={option.value}  onChange={formik.handleChange} id='allergies.reply'/>
            <span className="m-1 check-input">{option.label}</span>
          </label>
        ))}
        </div>   
   <div className="w-50 d-none" id="allegList">
   <label className='fw-bold m-2' htmlFor="allerList">Please list them. </label>
    <textarea name="allergies.allerList" id="allergies.allerList" cols="80" rows="5" onChange={formik.handleChange}
        onBlur={formik.handleBlur} className="form-control"/>
   </div>
    
      </div>

      </div>

   
      <div className="p-2 w-75 m-auto  ">
      <label className='fw-bold m-2' htmlFor="tobacco">Do you use any kind of tobacco or have you ever used them? </label>

          <div className='checkbox-container w-50 m-2'>
          <select onBlur={formik.handleBlur} className="form-select mb-2 " name="tobacco.choice" id='tobacco.choice'  value={formik.values.tobacco.choice} onChange={formik.handleChange}>
           <option>Please select</option>
           <option value="Yes">Yes</option>
           <option value="No">No</option> 
       </select>
        
        </div>   
   <div className="w-50 d-none" id="tobaco">
   <label className='fw-bold m-2' htmlFor="Tobacco">What kind of tobacco products? How long have you used/been using them?</label>
    <textarea name="tobacco.Tobacco" id="tobacco.Tobacco" cols="80" rows="5" onChange={formik.handleChange}
        onBlur={formik.handleBlur} className="form-control"/>
   </div>
    
      </div>

      <div className="p-2 w-75 m-auto  ">
      <label className='fw-bold m-2' htmlFor="illegalDrugs">Do you use any kind of illegal drugs or have you ever used them? </label>

          <div className='checkbox-container w-50 m-2'>
          <select onBlur={formik.handleBlur} className="form-select mb-2 " name="illegalDrugs.multiChoice" id='illegalDrugs.multiChoice'  value={formik.values.multiChoice} onChange={formik.handleChange}>
           <option>Please select</option>
           <option value="Yes">Yes</option>
           <option value="No">No</option> 
       </select>
        
        </div>   
   <div className="w-50 d-none" id="illegDrugs">
   <label className='fw-bold m-2' htmlFor="drugs">What kind of drugs? How long have you used/been using them?</label>
    <textarea name="illegalDrugs.drugs" id="illegalDrugs.drugs" cols="50" rows="5" onChange={formik.handleChange}
        onBlur={formik.handleBlur} className="form-control"/>
   </div>
    
      </div>
    
      <div className="p-2 w-75 m-auto  ">
      <label className='fw-bold m-2' htmlFor="consumeAlcohol">How often do you consume alcohol?</label>

          <div className='checkbox-container w-50 m-2'>
          {ConsumeAlcohol.map((option) => (
          <label key={option.value} className=''>
            <input type="radio" name="consumeAlcohol"  onBlur={formik.handleBlur} value={option.value}  onChange={formik.handleChange} id='consumeAlcohol'/>
            <span className="m-1 check-input">{option.label}</span>
          </label>
        ))}
        </div>   
  
    
      </div>

      <div className=" m-auto p-2 w-100 text-center mb-3">
       {isLoading?<button className='btn btn-outline-primary fw-bold text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn btn-outline-primary fw-bold text-black'>Save</button>}
       </div>
     
        </div>
        </form>
   </div>
  </>
}
