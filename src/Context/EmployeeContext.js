import axios from "axios";
import { createContext, useEffect, useState} from "react";
import { toast } from "react-toastify";
export let EmployeeContext = createContext();

export function EmployeeContextProvider(props){
    
    function handleAddEmployee(values){
      return axios.post(`http://localhost:3000/Admin/addEmployee`,values,{
        headers:{token:`${localStorage.getItem('Token')}`}
       }).catch((errr)=>{
        console.log(errr)
       toast.error(`${errr.response.data.Error}`)
       })
    }
    function AllEmployee(pageNumber) {
        return axios.get(`http://localhost:3000/Admin/findAllEmployee?currentPage=${pageNumber}`,{
                headers:{token:`${localStorage.getItem('Token')}`}
               }).catch((errr)=>{
                console.log(errr)
               toast.error(`${errr.response.data.Error}`)
               })
          }
          function employeeDetails(Id) {
            return axios.get(`http://localhost:3000/Admin/findOneEmployee?EmployeeID=${Id}`,{
                 headers:{token:`${localStorage.getItem('Token')}`}
                }).catch((errr)=>{
                    console.log(errr)
                   toast.error(`${errr.response.data.Error}`)
                   })
           }   
           function editEmployee(id,values){

            return axios.put(`http://localhost:3000/Admin/UpdateEmployee?EmployeeID=${id}`,values,{
              headers:{token:`${localStorage.getItem('Token')}`}
              
             }).catch((errr)=>{
              console.log(errr);
              toast.error(`${errr.response.data.Error}`)
             })
            }
            function removeEmployee(Id,pageNumber){
                return axios.delete(`http://localhost:3000/Admin/DeleteEmployee?EmployeeID=${Id}&currentPage=${pageNumber}`,{
                     headers:{token:`${localStorage.getItem('Token')}`}
                    }).catch((errr)=>{
                     console.log(errr);
                    toast.error(`${errr.response.data.Error}`)
                    })
              }   
    
    return <EmployeeContext.Provider value={{handleAddEmployee,AllEmployee,employeeDetails,editEmployee,removeEmployee}}>
    {props.children}
    </EmployeeContext.Provider>
}