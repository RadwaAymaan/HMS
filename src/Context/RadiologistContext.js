import axios from "axios";
import { id } from "date-fns/locale";
import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
export let RadiologistContext = createContext();

export function RadiologistContextProvider(props){

    const [messageError,setmessageError]=useState('')
    const [isLoading,setLoading]=useState(false)
    const [xray, setxray] = useState([])
    const [num, setnum] = useState([])
    const [presId, setpresId] = useState('')
    async function handleAddRadiologist(values){

        return axios.post(`http://localhost:3000/Admin/addRadiologist`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
          
         }).catch((errr)=>{
          console.log(errr);
         
          toast.error(`${errr.response.data.Error}`)
         })
        }


    async function AllRadiologist(pageNumber) {
         return axios.get(`http://localhost:3000/Admin/findAllRadiologist?currentPage=${pageNumber}`,{
                 headers:{token:`${localStorage.getItem('Token')}`}
                });
           }

    async function removeRadiologist(Id,pageNumber){
        return axios.delete(`http://localhost:3000/Admin/DeleteRadiologist?RadiologistID=${Id}&currentPage=${pageNumber}`,{
             headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
             console.log(errr);
            
            toast.error(`${errr.response.data.Error}`)
            })
      }

    async function RadiologistDetails(Id) {
        return axios.get(`http://localhost:3000/Admin/findOneRadiologist?RadiologistID=${Id}`,{
             headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
               console.log(errr);
               setLoading(false)
               toast.error(`${errr.response.data.Error}`)
              })
       }

       async function editRadiologist(id,values){

        return axios.put(`http://localhost:3000/Admin/UpdateRadiologist?RadiologistID=${id}`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
          
         }).catch((errr)=>{
          console.log(errr);
         
          toast.error(`${errr.response.data.Error}`)
         })
           }
    
          function showPatient(){
            return axios.get(`http://localhost:3000/Radiologist/viewPatient`,{
              headers:{token:`${localStorage.getItem('Token')}`}
             }).catch((errr)=>{
               console.log(errr);
            
               toast.error(`${errr.response.data.Error}`)
              })
          }
         
         function sendReport(patientId,Id,values){

          const data = new FormData()
          data.append('file', values.file)
          data.append('price', values.price)
          data.append('type', values.type)
        
          return axios.post(`http://localhost:3000/Radiologist/addX_RayReport?patientID=${patientId}&prescriptionId=${Id}`,data,{
              headers:{token:`${localStorage.getItem('Token')}`}
             }).catch((errr)=>{
               toast.error(`${errr.response.data.Error}`)
              })
         } 

         async function AllReports(pageNumber) {
          return axios.get(`http://localhost:3000/Radiologist/viewX_RayReport?currentPage=${pageNumber}`,{
                  headers:{token:`${localStorage.getItem('Token')}`}
                 }).catch((errr)=>{
                    toast.error(`${errr.response.data.Error}`)
                   })
            }

            async function removeReport(Id){
              return axios.delete(`http://localhost:3000/Radiologist/deleteX_RayReport?reportID=${Id}`,{
                   headers:{token:`${localStorage.getItem('Token')}`}
                  }).catch((errr)=>{
              
                  
                  toast.error(`${errr.response.data.Error}`)
                  })
            }
      
          async function ReportDetails(Id) {
              return axios.get(`http://localhost:3000/Radiologist/viewX_RayReportDetails?reportID=${Id}`,{
                   headers:{token:`${localStorage.getItem('Token')}`}
                  }).catch((errr)=>{
               
                   
                    toast.error(`${errr.response.data.Error}`)
                   })
             }  

         

    return <RadiologistContext.Provider value={{presId,setpresId,setnum,num,setxray,xray,handleAddRadiologist,AllRadiologist,removeRadiologist,RadiologistDetails,editRadiologist,showPatient,sendReport,AllReports,removeReport,ReportDetails}}>
    {props.children}
   </RadiologistContext.Provider>
}