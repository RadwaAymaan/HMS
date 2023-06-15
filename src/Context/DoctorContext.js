import axios from "axios";
import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
export let DoctorContext = createContext();

export function DoctorContextProvider(props){
    const [isLoading,setLoading]=useState(false)
    const [date, setdate] = useState([])
    const [error, seterror] = useState(false)
    const [ind, setind] = useState([])


    
         function handleAddDoctor(values){

        return axios.post(`http://localhost:3000/Admin/AddDoctor`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
          
         }).catch((errr)=>{
  
          setLoading(false)
         toast.error(`${errr.response.data.Error}`)
         })

           }
           
        function editDoctor(id,values){

        return axios.put(`http://localhost:3000/Admin/updateDoctor?DoctorID=${id}`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
          
         }).catch((errr)=>{
  
          setLoading(false)
          toast.error(`${errr.response.data.Error}`)
         })
           }
          function AllDoctors(pageNumber) {
           return axios.get(`http://localhost:3000/Admin/findAll?currentPage=${pageNumber}`,{
                headers:{token:`${localStorage.getItem('Token')}`}
               }).catch((errr)=>{
        
                setLoading(false)
                toast.error(`${errr.response.data.Error}`)
               })
           }
        
           function DoctorDetails(doctorId) {
            return axios.get(`http://localhost:3000/Admin/findOneDoctor?DoctorID=${doctorId}`,{
                 headers:{token:`${localStorage.getItem('Token')}`}
                }).catch((errr)=>{
          
                  setLoading(false)
                  toast.error(`${errr.response.data.Error}`)
                 })
           }

            function removeDoctor(doctorId,pageNumber){
                 return axios.delete(`http://localhost:3000/Admin/DeleteDoctor?DoctorID=${doctorId}&currentPage=${pageNumber}`,{
                  headers:{token:`${localStorage.getItem('Token')}`}
                 }).catch((errr)=>{
          
                  setLoading(false)
                 toast.error(`${errr.response.data.Error}`)
                 })
           }

            function time(doctorId,values){
                 return axios.post(`http://localhost:3000/Admin/AddTiming?DoctorID=${doctorId}`,values,{
                  headers:{token:`${localStorage.getItem('Token')}`}
                 }).catch((errr)=>{
          
                  setLoading(false)
                 toast.error(`${errr.response.data.Error}`)
                 })
           }

            function Appointment(id) {
            return axios.get(`http://localhost:3000/Doctor/ViewAppointment?userID=${id}`,{
              headers:{token:`${localStorage.getItem('Token')}`}
             }).catch((errr)=>{
      
              setLoading(false)
              toast.error(`${errr.response.data.Error}`)
             })
            
           }
          
           function MakeMedicalHistory(patientId,values){
            return axios.post(`http://localhost:3000/Doctor/addMedicalHistory?PatientID=${patientId}`,values,{
                headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
      
              setLoading(false)
              toast.error(`${errr.response.data.Error}`)
             })
  }

           function showMedicalHistory(patientId){
            return axios.get(`http://localhost:3000/Doctor/viewMedicalHistory?patientID=${patientId}`,{
              headers:{token:`${localStorage.getItem('Token')}`}
             }).catch((errr)=>{
              seterror(true)
      
             toast.error(`${errr.response.data.Error}`)
             })
           }

           function checkMedicalHistory(patientId){
            return axios.get(`http://localhost:3000/Doctor/checkMedicalHistory?PatientID=${patientId}`,{
                headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
              seterror(true)
      
             toast.error(`${errr.response.data.Error}`)
             })
        }
        function editMedicalHistory(PatientID,values){

          return axios.put(`http://localhost:3000/Doctor/updateMedicalHistory?PatientID=${PatientID}`,values,{
            headers:{token:`${localStorage.getItem('Token')}`}
            
           }).catch((errr)=>{
    
            setLoading(false)
            toast.error(`${errr.response.data.Error}`)
           })
             }

           async function Prescription(doctorId,patientId,values){
            return axios.post(`http://localhost:3000/Doctor/addPrescription?userID=${doctorId}&patientID=${patientId}`,values,{
             headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
      
             setLoading(false)
            toast.error(`${errr.response.data.Error}`)
            })
      }
      function showPrescription(doctorId,patientId){
       return axios.get(`http://localhost:3000/Doctor/viewPrescription?userID=${doctorId}&patientID=${patientId}`,{
        headers:{token:`${localStorage.getItem('Token')}`}
       }).catch((errr)=>{

        setLoading(false)
       toast.error(`${errr.response.data.Error}`)
       })
      }
      
      function editPrescription(doctorId,patientId,values){
        return axios.put(`http://localhost:3000/Doctor/updatePrescription?userID=${doctorId}&patientID=${patientId}`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
         }).catch((errr)=>{
  
          setLoading(false)
          toast.error(`${errr.response.data.Error}`)
         })
      }

      async function makeDisease(patientId,values){
        return axios.post(`http://localhost:3000/Doctor/addPatientDisease?patientID=${patientId}`,values,{
         headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
  
        toast.error(`${errr.response.data.Error}`)
        })
  }

  async function removeDisease(patientId,disease){
    return axios.delete(`http://localhost:3000/Doctor/deletePatientDisease?patientID=${patientId}&disease=${disease}`,{
     headers:{token:`${localStorage.getItem('Token')}`}
    }).catch((errr)=>{
    toast.error(`${errr.response.data.Error}`)
    })
}
    
function Date(dat){
  setdate(dat)

}
function indOfPrescription(ind){
  setind(ind)
}
   function showpatientDetails(patientId,doctorId){
    return axios.get(`http://localhost:3000/Doctor/viewPatientDetails?patientID=${patientId}&userID=${doctorId}`,{
         headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
  
         toast.error(`${errr.response.data.Error}`)
         })
   }

   function ShowAllPatient(pageNumber){
     return axios.get(`http://localhost:3000/Doctor/viewAllPatient?currentPage=${pageNumber}`,{
      headers:{token:`${localStorage.getItem('Token')}`}
     }).catch((errr)=>{

      toast.error(`${errr.response.data.Error}`)
      })
   }

   function getAllMedicines(){
     return axios.get(`http://localhost:3000/Doctor/getAllMedicines`,{
      headers:{token:`${localStorage.getItem('Token')}`}
     }).catch((errr)=>{

      toast.error(`${errr.response.data.Error}`)
      })
   }
   function getAllLab(){
     return axios.get(`http://localhost:3000/Doctor/getAllTests`,{
      headers:{token:`${localStorage.getItem('Token')}`}
     }).catch((errr)=>{

      toast.error(`${errr.response.data.Error}`)
      })
   }

   function patientVitalSigns(id){
    return axios.get(`http://localhost:3000/Doctor/viewReportForPatient?patientID=${id}`,{
     headers:{token:`${localStorage.getItem('Token')}`}
    }).catch((errr)=>{
     toast.error(`${errr.response.data.Error}`)
     })
  }
    return <DoctorContext.Provider value={{indOfPrescription,error,ind,date,isLoading,setLoading,Date,Prescription,handleAddDoctor,AllDoctors,DoctorDetails,removeDoctor,time,editDoctor,Appointment,showMedicalHistory,makeDisease,removeDisease,showPrescription,editPrescription,showpatientDetails,ShowAllPatient,checkMedicalHistory,MakeMedicalHistory,editMedicalHistory,getAllMedicines,patientVitalSigns,getAllLab}}>
    {props.children}
   </DoctorContext.Provider>
}