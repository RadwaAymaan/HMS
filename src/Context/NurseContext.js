import axios from "axios";
import { createContext, useState} from "react";
import { toast } from "react-toastify";
export let NurseContext = createContext();

export function NurseContextProvider(props){
   
    const [details, setdetails] = useState([])
    const [isLoading, setisLoading] = useState(false)
       function handleAddNurse(values){
        return axios.post(`http://localhost:3000/Admin/addNurse`,values,{
            headers:{token:`${localStorage.getItem('Token')}`}
           }).catch((errr)=>{
            console.log(errr);
            toast.error(`${errr.response.data.Error}`)
            setisLoading(false)
           })
    }

       function AllNurses(pageNumber) {
        return axios.get(`http://localhost:3000/Admin/findAllNurse?currentPage=${pageNumber}`,{
             headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
             console.log(errr);
             toast.error(`${errr.response.data.Error}`)
            })
        }
         function nurseDetails(nurseId) {
            return axios.get(`http://localhost:3000/Admin/findOneNurse?NurseID=${nurseId}`,{
                 headers:{token:`${localStorage.getItem('Token')}`}
                }).catch((errr)=>{
                  console.log(errr);
                  toast.error(`${errr.response.data.Error}`)
                 })
           }
           
            function editNurse(id,values){
            return axios.put(`http://localhost:3000/Admin/UpdateNurse?NurseID=${id}`,values,{
              headers:{token:`${localStorage.getItem('Token')}`}
              
             }).catch((errr)=>{
              console.log(errr);
              toast.error(`${errr.response.data.Error}`)
             })
               }

           function removeNurse(doctorId,pageNumber){
            return axios.delete(`http://localhost:3000/Admin/DeleteNurse?NurseID=${doctorId}&currentPage=${pageNumber}`,{
             headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
             console.log(errr);
             
            toast.error(`${errr.response.data.Error}`)
            })
      }
    
   function makeRoom(values){
    return axios.post(`http://localhost:3000/Admin/addRoom`,values,{
        headers:{token:`${localStorage.getItem('Token')}`}
       })
   }

   function AllRooms(pageNumber) {
    return axios.get(`http://localhost:3000/Admin/viewAllRooms?currentPage=${pageNumber}`,{
         headers:{token:`${localStorage.getItem('Token')}`}
        }).catch((errr)=>{
         console.log(errr);
         toast.error(`${errr.response.data.Error}`)
        })
    }
    function editRoom(id,values){
      return axios.put(`http://localhost:3000/Admin/updateRoom?idRoom=${id}`,values,{
        headers:{token:`${localStorage.getItem('Token')}`}
        
       }).catch((errr)=>{
        console.log(errr);
        toast.error(`${errr.response.data.Error}`)
       })
         }
    
    function removeRoom(roomID,pageNumber){
      return axios.delete(`http://localhost:3000/Admin/deleteRoom?idRoom=${roomID}&currentPage=${pageNumber}`,{
       headers:{token:`${localStorage.getItem('Token')}`}
      }).catch((errr)=>{
       console.log(errr);
       
      toast.error(`${errr.response.data.Error}`)
      })
}
    function allPatients(roomID,pageNumber){
      return axios.get(`http://localhost:3000/Nurse/viewPatients`,{
       headers:{token:`${localStorage.getItem('Token')}`}
      }).catch((errr)=>{
       console.log(errr);
      toast.error(`${errr.response.data.Error}`)
      })

}
function makeVitalSigns(patientId,values){
  return axios.post(`http://localhost:3000/Nurse/addReportForPatient?patientID=${patientId}`,values,{
      headers:{token:`${localStorage.getItem('Token')}`}
     }).catch((errr)=>{
      console.log(errr);
     toast.error(`${errr.response.data.Error}`)
     })

 }

 function editVitalSigns(patientId,values){
  return axios.put(`http://localhost:3000/Nurse/updateReportForPatient?patientID=${patientId}`,values,{
    headers:{token:`${localStorage.getItem('Token')}`}
    
   }).catch((errr)=>{
    console.log(errr);
    toast.error(`${errr.response.data.Error}`)

   })
     }

     function viewVitalSigns(patientId){
      return axios.get(`http://localhost:3000/Nurse/viewReportForPatient?patientID=${patientId}`,{
       headers:{token:`${localStorage.getItem('Token')}`}
      }).catch((errr)=>{
       console.log(errr);
      toast.error(`${errr.response.data.Error}`)
      })

}
     function viewMedicines(patientId){
      return axios.get(`http://localhost:3000/Nurse/viewMedication?patientID=${patientId}`,{
       headers:{token:`${localStorage.getItem('Token')}`}
      }).catch((errr)=>{
       console.log(errr);
      toast.error(`${errr.response.data.Error}`)
      })

}



    return <NurseContext.Provider value={{setisLoading,isLoading,setdetails,details,handleAddNurse,AllNurses,nurseDetails,editNurse,removeNurse,makeRoom,AllRooms,editRoom,removeRoom,allPatients,makeVitalSigns,viewVitalSigns,editVitalSigns,viewMedicines}}>
    {props.children}
   </NurseContext.Provider>
}
