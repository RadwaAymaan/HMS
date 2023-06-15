import React from 'react'
import styles from './EditPrescription.module.css'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import  jwtDecode  from 'jwt-decode';
import { toast } from 'react-toastify';
import { useContext } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { useParams } from 'react-router-dom'
import Select from "react-select";
export default function EditPrescription() {
  const [data, setdata] = useState([])
  const [lab, setLab] = useState([])
  const [x_ray, setX_ray] = useState([])
  const [advice, setAdvice] = useState([])
  const [date, setdate] = useState([])
  const [Loading,setLoading]=useState(false)
  const [user, setuser] = useState([])
  const [Medicine_name, setMedicine_name] = useState([])
  let {editPrescription,isLoading,showPrescription,ind,getAllMedicines} = useContext(DoctorContext)
  let parmas = useParams()
  let navigate = useNavigate()

  async function medicine() {
    let {data}=await getAllMedicines()
    
   
    const Options = 
    
      
      (data.Medicines).map((mid)=>(

       { value: mid.Medicine_name, label: mid.Medicine_name }
  
    ))
    setMedicine_name(Options)
  }

  async function updatePrescription(doctorid,patientid,value) {
    setLoading(true)
    let {data}= await editPrescription(doctorid,patientid,value)
    console.log(data);
    if (data.message === 'success')
    {
      setLoading(false)
      toast.success('Success message');
      
      navigate(`/Doctor/ViewPrescription/${parmas.id}`)
    }
  }

  


  async function viewprescription(doctorId,patientId){
    let {data} = await showPrescription(doctorId,patientId)
    setdata(data.data[ind].Medication)
    setLab(data.data[ind].Lab)
    setX_ray(data.data[ind].X_ray)
    setAdvice(data.data[ind].Advice)
    setdate(data.data[ind].datePatient)
    console.log(data);
    
  } 
  function saveUser(){
    let encodedToken = localStorage.getItem('Token');
    let decodedToken= jwtDecode(encodedToken);
    setuser(decodedToken.id)
     viewprescription(decodedToken.id,parmas.id)

    }
   
    useEffect(() => {
      saveUser()
      medicine()
    }, []); 

  
  
  let formik = useFormik({ 
    initialValues:
    {
      Medication:data,
      Lab:lab,
      X_ray:x_ray,
      Advice:advice,
      datePatient:date
  },enableReinitialize:true,
  onSubmit:((values)=>{
    updatePrescription(user,parmas.id,values)
   
    const selectedValues = values.Medication.map((option) => option.value);
    const selectedlabValues = values.Lab.map((option) => option.value);
    const selectedXrayValues = values.X_ray.map((option) => option.value);
    setdata(selectedValues)
    setLab(selectedlabValues)
    setX_ray(selectedXrayValues)
 
  })
  })
  const labOption = [
    {value:'Hb',label:'Hb'},
    {value:'RBC',label:'RBC'},
    {value:'WBC',label:'WBC'},
    {value:'Hct',label:'Hct'},
    {value:'PLT',label:'PLT'},
    {value:'MCV',label:'MCV'},
    {value:'MCH',label:'MCH'},
    {value:'MCHC',label:'MCHC'},
    {value:'Reticulocyte Malaria',label:'Reticulocyte Malaria'},
    {value:'ESR',label:'ESR'},
    {value:'DC',label:'DC'},
    {value:'Band',label:'Band'},
    {value:'Neutrophils',label:'Neutrophils'},
    {value:'Lymphocytes',label:'Lymphocytes'},
    {value:'Monocytes',label:'Monocytes'},
    {value:'Eosinophils',label:'Eosinophils'},
    {value:'Lymphocytes',label:'Lymphocytes'},
    {value:'Basophils',label:'Basophils'},
    {value:'BT',label:'BT'},
    {value:'CT',label:'CT'},
    {value:'Blood Type',label:'Blood Type'},
    {value:'Rh factor',label:'Rh factor'},
    {value:'BP',label:'BP'},
    {value:'Height',label:'Height'},
    {value:'Weight',label:'Weight'},

]
const x_rayOptions=[
  {value:'Radiography',label:'Radiography'},
  {value:'Fluoroscopy',label:'Fluoroscopy'},
  {value:'CT',label:'CT'},
  {value:'Chest X-ray',label:'Chest X-ray'},
  {value:'Skull X-ray',label:'Skull X-ray'},
  {value:'Lumbar spine',label:'Lumbar spine'},
  {value:'IV urogram',label:'IV urogram'},
  {value:'Upper gastrointestinal exam',label:'Upper gastrointestinal exam'},
  {value:'Barium enema',label:'Barium enema'},
  {value:'CT head',label:'CT head'},
  {value:'CT abdomen',label:'CT abdomen'},
]
  
 


  return<>
    
   <div className=' bg-opacity-75 bg-light p-4 rounded  m-5'>
   <div className="p-1 fs-4 bg-light rounded w-50 m-auto mb-3">
   <h3 className='fw-bold text-center text-primary text-opacity-75 h4'>Medical Prescription Form</h3>
   </div>
   <form onSubmit={formik.handleSubmit} >

    <div className="d-flex flex-wrap">
     
     <div className='w-75 m-auto  p-2 d-flex justify-content-between'>
     <label className='fw-bold bg-light rounded p-1 h-50' htmlFor="Medication">Medication</label>
     <div className="dropdown-container w-75 ">
      <Select
      name='Medication'
      id='Medication'
        options={Medicine_name}
        placeholder="Select medicine"
         value={formik.values.Medication}
         onChange={(selectedOptions) => formik.setFieldValue('Medication', selectedOptions)}
     
        isSearchable={true}
        isMulti
      />
    </div>
      
      </div>

     <div className='w-75 m-auto  p-2 d-flex justify-content-between'>
     <label className='fw-bold bg-light rounded p-4 h-50  pt-1 pb-0 text-center '  htmlFor="Lab">Lab</label>
     <div className="dropdown-container w-75 ">
      <Select
      name='Lab'
      id='Lab'
        options={labOption}
        placeholder="Select Lab analysis"
        value={formik.values.Lab}
        onChange={(selectedOptions) => formik.setFieldValue('Lab', selectedOptions)}
        isSearchable={true}
        isMulti
      />
    </div>
      </div>

     <div className='w-75 m-auto  p-2 d-flex justify-content-between'>
     <label className='fw-bold bg-light rounded p-2 h-50 ' htmlFor=" X_ray">Radiology</label>
     <div className="dropdown-container w-75 ">
      <Select
      name='X_ray'
      id='X_ray'
        options={x_rayOptions}
        placeholder="Select Radiology"
        value={formik.values.X_ray}
        onChange={(selectedOptions) => formik.setFieldValue('X_ray', selectedOptions)}
        isSearchable={true}
        isMulti
      />
    </div>
      </div>

      <div className="w-75 m-auto  p-2 d-flex justify-content-between">
      <label className='fw-bold bg-light rounded d-block h-50 p-2' htmlFor='Advice'>Advice</label>
        <div className="w-75  ">
        <textarea name="Advice" id="Advice" value={formik.values.Advice} cols="80" rows="5" onChange={formik.handleChange}
        onBlur={formik.handleBlur} className="form-control"/>
        </div>
   
      </div>
      </div>

      <div className="mx-5 p-1">
       {Loading?<button className='btn btn-outline-primary  text-black'><i className='fas fa-spinner fa-spin'></i></button>:
       <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn  btn-outline-primary fw-bold text-black'>Update Prescription</button>}
       </div>

    </form>

   
 
   </div>
   

  </>
}
