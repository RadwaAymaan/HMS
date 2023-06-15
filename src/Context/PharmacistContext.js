import axios from "axios";
import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify";

export let PharmacistContext = createContext();

export function PharmacistContextProvider(props){

    const [messageError,setmessageError]=useState('')
    const [isLoading,setLoading]=useState(false)
    const [mid, setmid] = useState([])
    const [num, setnum] = useState([])
    const [med, setmed] = useState({})
    async function handleAddPharmacist(values){

        return axios.post(`http://localhost:3000/Admin/AddPharmacist`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
          
         }).catch((errr)=>{
          console.log(errr);
          setLoading(false)
        toast.error(`${errr.response.data.Error}`)
         })
        }


    async function AllPharmacist(pageNumber) {
         return axios.get(`http://localhost:3000/Admin/findAllPharmacist?currentPage=${pageNumber}`,{
                 headers:{token:`${localStorage.getItem('Token')}`}
                }).catch((errr)=>{
                  console.log(errr);
                  setLoading(false)
                toast.error(`${errr.response.data.Error}`)
                 })
           }

    async function removePharmacist(Id,pageNumber){
        return axios.delete(`http://localhost:3000/Admin/DeletePharmacist?pharmacistID=${Id}&currentPage=${pageNumber}`,{
             headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
             console.log(errr);
             setLoading(false)
            toast.error(`${errr.response.data.Error}`)
            })
      }

    async function PharmacistDetails(Id) {
        return axios.get(`http://localhost:3000/Admin/findOnePharmacist?pharmacistID=${Id}`,{
             headers:{token:`${localStorage.getItem('Token')}`}
            }).catch((errr)=>{
              console.log(errr);
              setLoading(false)
            toast.error(`${errr.response.data.Error}`)
             })
       }

       async function editPharmacist(id,values){

        return axios.put(`http://localhost:3000/Admin/updatePharmacist?pharmacistID=${id}`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
          
         }).catch((errr)=>{
          console.log(errr);
          setLoading(false)
        toast.error(`${errr.response.data.Error}`)
         })
           }

         async function makeMedicine(values) {
          return axios.post(`http://localhost:3000/Pharmacy/AddMedicine`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
          
         }).catch((errr)=>{
          console.log(errr);
          setLoading(false)
        toast.error(`${errr.response.data.Error}`)
         })
         }  

         async function showMedicines(pageNumber) {
          return axios.get(`http://localhost:3000/Pharmacy/findAll?currentPage=${pageNumber}`,{
          headers:{token:`${localStorage.getItem('Token')}`}
         }).catch((errr)=>{
          console.log(errr);
          setLoading(false)
        toast.error(`${errr.response.data.Error}`)
         })
         }

         async function removeMedicine(Id,pageNumber){
          return axios.delete(`http://localhost:3000/Pharmacy/deleteMedicine?MedicineID=${Id}&currentPage=${pageNumber}`,{
               headers:{token:`${localStorage.getItem('Token')}`}
              }).catch((errr)=>{
               console.log(errr);
               setLoading(false)
              toast.error(`${errr.response.data.Error}`)
              })
        }

        async function MedicineSearch() {
          return axios.get(`http://localhost:3000/Pharmacy/searchMedicine`,{
               headers:{token:`${localStorage.getItem('Token')}`}
              }).catch((errr)=>{
                console.log(errr);
                setLoading(false)
              toast.error(`${errr.response.data.Error}`)
               })
         }
        async function medicineDetails(id) {
          return axios.get(`http://localhost:3000/Pharmacy/findOne?MedicineID=${id}`,{
               headers:{token:`${localStorage.getItem('Token')}`}
              }).catch((errr)=>{
                console.log(errr);
                setLoading(false)
              toast.error(`${errr.response.data.Error}`)
               })
         }
  
         async function editMedicine(id,values){
  
          return axios.put(`http://localhost:3000/Pharmacy/UpdateMedicine?MedicineID=${id}`,values,{
            headers:{token:`${localStorage.getItem('Token')}`}
            
           }).catch((errr)=>{
            console.log(errr);
            setLoading(false)
          toast.error(`${errr.response.data.Error}`)
           })
             }

             function showPatient(){
              return axios.get(`http://localhost:3000/Pharmacy/viewPatient`,{
                headers:{token:`${localStorage.getItem('Token')}`}
               }).catch((errr)=>{
                 console.log(errr);
              
                 toast.error(`${errr.response.data.Error}`)
                })
            } 
            
            async function buyMedicine(patientId,values) {
              return axios.post(`http://localhost:3000/Pharmacy/buyMedicine?patientId=${patientId}`,values,{
              headers:{token:`${localStorage.getItem('Token')}`}
              
             }).catch((errr)=>{
              console.log(errr);
              setLoading(false)
            toast.error(`${errr.response.data.Error}`)
             })
             }  

             function finishBuy(id){
              return axios.get(`http://localhost:3000/Pharmacy/finishBuy?PrescriptionId=${id}`,{
                headers:{token:`${localStorage.getItem('Token')}`}
               }).catch((errr)=>{
                 console.log(errr);
                 toast.error(`${errr.response.data.Error}`)
                })
            } 
            


    return <PharmacistContext.Provider value={{med,setmed,mid,setmid,num, setnum,handleAddPharmacist,AllPharmacist,removePharmacist,PharmacistDetails,editPharmacist,makeMedicine,showMedicines,removeMedicine,MedicineSearch,editMedicine,showPatient,buyMedicine,finishBuy}}>
    {props.children}
   </PharmacistContext.Provider>
}