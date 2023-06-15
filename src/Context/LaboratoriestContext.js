import axios from "axios";
import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
export let LaboratoriestContext = createContext();

export function LaboratoriestContextProvider(props){
    
  const [lab, setlab] = useState([]) 
    const [messageError,setmessageError]=useState('')
    const [isLoading,setLoading]=useState(false)
    const [num, setnum] = useState([])
    const [preId, setpreId] = useState('')
     function handleAddLaboratoriest(values){

        return axios.post(`http://localhost:3000/Admin/AddLaboratoriest`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
          
         }).catch((errr)=>{
          toast.error(`${errr.response.data.Error}`)
          })
        }


     function AllLaboratoriest(pageNumber) {
         return axios.get(`http://localhost:3000/Admin/findAllLaboratoriest?currentPage=${pageNumber}`,{
                 headers:{token:`${localStorage.getItem('Token')}`}
                }).catch((errr)=>{
                 toast.error(`${errr.response.data.Error}`)
                 })
           }

     function removeLaboratoriest(Id,pageNumber){
        return axios.delete(`http://localhost:3000/Admin/DeleteLaboratoriest?currentPage=${pageNumber}&LaboratoriestID=${Id}`,{
             headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
            toast.error(`${errr.response.data.Error}`)
            })
      }

     function LaboratoriestDetails(Id) {
        return axios.get(`http://localhost:3000/Admin/findOneLaboratoriest?LaboratoriestID=${Id}`,{
             headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
              toast.error(`${errr.response.data.Error}`)
              })
       }

        function editLaboratoriest(id,values){

        return axios.put(`http://localhost:3000/Admin/updateLaboratoriest?LaboratoriestID=${id}`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
          
         }).catch((errr)=>{
          toast.error(`${errr.response.data.Error}`)
          })
           }

           function showPatient(){
            return axios.get(`http://localhost:3000/Labratoriest/viewPatient`,{
              headers:{token:`${localStorage.getItem('Token')}`}
             }).catch((errr)=>{
              toast.error(`${errr.response.data.Error}`)
              })
          }
         
         function sendReport(patientId,id,values){

          const data = new FormData()
          data.append('file', values.file)
          data.append('price', values.price)
          data.append('type', values.type)

          return axios.post(`http://localhost:3000/Labratoriest/addLapReport?patientID=${patientId}&prescriptionId=${id}`,data,{
              headers:{token:`${localStorage.getItem('Token')}`}
             }).catch((errr)=>{
              toast.error(`${errr.response.data.Error}`)
              })
         } 

         async function AllReports(pageNumber) {
          return axios.get(`http://localhost:3000/Labratoriest/viewLabReport?currentPage=${pageNumber}`,{
                  headers:{token:`${localStorage.getItem('Token')}`}
                 }).catch((errr)=>{
                  toast.error(`${errr.response.data.Error}`)
                  })
            }

            async function removeReport(Id){
              return axios.delete(`http://localhost:3000/Labratoriest/deleteReport?reportID=${Id}`,{
                   headers:{token:`${localStorage.getItem('Token')}`}
                  }).catch((errr)=>{
                    toast.error(`${errr.response.data.Error}`)
                    })
            }
      
          async function ReportDetails(Id) {
              return axios.get(`http://localhost:3000/Labratoriest/viewReportDetails?reportID=${Id}`,{
                   headers:{token:`${localStorage.getItem('Token')}`}
                  }).catch((errr)=>{
                    toast.error(`${errr.response.data.Error}`)
                    })
             }  
  

        

    return <LaboratoriestContext.Provider value={{preId,setpreId,num,setnum,handleAddLaboratoriest,AllLaboratoriest,removeLaboratoriest,LaboratoriestDetails,editLaboratoriest,showPatient,sendReport,AllReports,removeReport,ReportDetails,lab, setlab}}>
    {props.children}
   </LaboratoriestContext.Provider>
}