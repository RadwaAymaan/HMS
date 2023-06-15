import axios from "axios";
import { createContext} from "react";
import { toast } from "react-toastify";

export let PatientContext = createContext();

export function PatientContextProvider(props){
    
   
    function bookDoctor(Id,userid,values){
        return axios.post(`http://localhost:3000/patient/BookDoctor?doctorID=${Id}&userID=${userid}`,values,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
           
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
      
    }
  
    function timeDetails(doctorId){
        return axios.get(`http://localhost:3000/patient/timeDetails?doctorID=${doctorId}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
           
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
        
    }
    function showAppointment(userId){
        return axios.get(`http://localhost:3000/patient/ViewAppointment?userID=${userId}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
           
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
    }
       
    function showMedicalHistory(userId){
        return axios.get(`http://localhost:3000/patient/viewMedicalHistory?userID=${userId}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
           
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
    }


    function cancel(ID){
        return axios.delete(`http://localhost:3000/patient/cancelBookDoctor?idAppointment=${ID}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
           
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
    }

    function showPrescription(patientId){
        return axios.get(`http://localhost:3000/patient/viewPrescription?userID=${patientId}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
           
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
    
        }
  
    
       function showRoom(){
        return axios.get(`http://localhost:3000/patient/viewRoom`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
       } 
       function showBookRoom(userid){
        return axios.get(`http://localhost:3000/patient/viewBookRoom?userID=${userid}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
       } 
       function BookRoom(patientId,roomId){
        return axios.get(`http://localhost:3000/patient/BookRoom?userID=${patientId}&roomID=${roomId}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
       }
       function cancelRoom(patientId,roomId){
        return axios.delete(`http://localhost:3000/patient/cancelRoom?userID=${patientId}&roomID=${roomId}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
       }

       function patientInfo(userId){
        return axios.get(`http://localhost:3000/patient/patientInformation?userID=${userId}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
    }
       function patientDisease(userId){
        return axios.get(`http://localhost:3000/patient/viewDisease?userID=${userId}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        })
    }
       function patientLab(){
        return axios.get(`http://localhost:3000/patient/viewLabReport`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
    }
       function patientXray(userId){
        return axios.get(`http://localhost:3000/patient/viewX_RayReport`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
    }


    function allPatients(pageNumber){
        return axios.get(`http://localhost:3000/Admin/viewPatient?currentPage=${pageNumber}`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
    }
    function pay(){
        return axios.get(`http://localhost:3000/patient/createOrder`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
    }
    function showVitalSigns(){
        return axios.get(`http://localhost:3000/patient/viewReport`,{
            headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
            console.log(errr);
           toast.error(`${errr.response.data.Error}`)
           })
    }

    

    return <PatientContext.Provider value={{timeDetails,cancel,bookDoctor,showAppointment,showMedicalHistory,showPrescription,showRoom,BookRoom,cancelRoom,patientInfo,showBookRoom,patientDisease,patientLab,patientXray,allPatients,pay,showVitalSigns}}>
    {props.children}
   </PatientContext.Provider>
}