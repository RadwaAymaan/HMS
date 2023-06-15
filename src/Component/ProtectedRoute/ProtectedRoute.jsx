import React from 'react'
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute(props) {
 // console.log(props.children);
 if(localStorage.getItem('Token') == null){
   return <Navigate to="/HMS" />
 }
 else{
   return props.children;
   // console.log(props.children);
 }
}
