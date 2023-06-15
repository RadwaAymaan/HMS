import axios from "axios";
import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
export let AccountantContext = createContext();

export function AccountantContextProvider(props){
  const [num, setnum] = useState([])
  const [pagenum, setpagenum] = useState([])
        function handleAddAccountant(values){
        return axios.post(`http://localhost:3000/Admin/addAccountant`,values,{
          headers:{token:`${localStorage.getItem('Token')}`}
         }).catch((errr)=>{
          console.log(errr);
         toast.error(`${errr.response.data.Error}`)
         })
         }
   
         function AllAccountants(pageNumber) {
            return axios.get(`http://localhost:3000/Admin/findAllAccountant?currentPage=${pageNumber}`,{
                 headers:{token:`${localStorage.getItem('Token')}`}
                }).catch((errr)=>{
                 console.log(errr);
                 toast.error(`${errr.response.data.Error}`)
                })
            } 
            
            function AccountantDetails(accountantId) {
                return axios.get(`http://localhost:3000/Admin/findOneAccountant?AccountantID=${accountantId}`,{
                     headers:{token:`${localStorage.getItem('Token')}`}
                    }).catch((errr)=>{
                      console.log(errr);
                      toast.error(`${errr.response.data.Error}`)
                     })
               }    
            
                function editAccountant(id,values){
                return axios.put(`http://localhost:3000/Admin/UpdateAccountant?AccountantID=${id}`,values,{
                  headers:{token:`${localStorage.getItem('Token')}`}
                  
                 }).catch((errr)=>{
                  console.log(errr);
                  toast.error(`${errr.response.data.Error}`)
                 })   
                }


                function removeAccountant(accountantId,pageNumber){
                    return axios.delete(`http://localhost:3000Admin/DeleteAccountant?currentPage=${pageNumber}&AccountantID=${accountantId}`,{
                     headers:{token:`${localStorage.getItem('Token')}`}
                    }).catch((errr)=>{
                     console.log(errr);
                    toast.error(`${errr.response.data.Error}`)
                    })
              }

              function notPay(pageNumber) {
                return axios.get(`http://localhost:3000/Accountant/viewPatientNotPay?currentPage=${pageNumber}`,{
                     headers:{token:`${localStorage.getItem('Token')}`}
                    }).catch((errr)=>{
                     console.log(errr);
                     toast.error(`${errr.response.data.Error}`)
                    })
                } 

                function Pay(pageNumber) {
                  return axios.get(`http://localhost:3000/Accountant/viewPatientPay?currentPage=${pageNumber}`,{
                       headers:{token:`${localStorage.getItem('Token')}`}
                      }).catch((errr)=>{
                       console.log(errr);
                       toast.error(`${errr.response.data.Error}`)
                      })
                  }
               
                function showOrders(orderId) {
                  return axios.get(`http://localhost:3000/Accountant/viewOrderForPatient?orderID=${orderId}`,{
                       headers:{token:`${localStorage.getItem('Token')}`}
                      }).catch((errr)=>{
                       console.log(errr);
                       toast.error(`${errr.response.data.Error}`)
                      })
                  }
                function payBill(orderId) {
                  return axios.get(`http://localhost:3000/Accountant/payPatientBill?orderID=${orderId}`,{
                       headers:{token:`${localStorage.getItem('Token')}`}
                      }).catch((errr)=>{
                       console.log(errr);
                       toast.error(`${errr.response.data.Error}`)
                      })
                  }

    return <AccountantContext.Provider value={{pagenum, setpagenum,num,setnum,handleAddAccountant,AllAccountants,AccountantDetails,editAccountant,removeAccountant,notPay,Pay,showOrders,payBill}}>
    {props.children}
    </AccountantContext.Provider>
}