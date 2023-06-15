import logo from './logo.svg';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  RouterProvider, createBrowserRouter, useParams } from 'react-router-dom';
import Layout from './Component/Layout/Layout';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import NotFound from './Component/NotFound/NotFound';
import Admin from './Component/Admin/Admin';
import Patient from './Component/Patient/Patient';
import Doctor from './Component/Doctor/Doctor';
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import AddDoctor from './Component/AddDoctor/AddDoctor';
import ViewTiming from './Component/ViewTiming/ViewTiming';
import ViewDoctors from './Component/ViewDoctors/ViewDoctors';
import BookDoctor from './Component/BookDoctor/BookDoctor';
import {  DoctorContextProvider } from './Context/DoctorContext';
import { PharmacistContextProvider } from './Context/PharmacistContext';
import AllDoctors from './Component/AllDoctors/AllDoctors';
import { PatientContextProvider } from './Context/PatientContext';
import { NurseContextProvider } from './Context/NurseContext';
import { RadiologistContextProvider } from './Context/RadiologistContext';
import DoctorDetails from './Component/DoctorDetails/DoctorDetails';
import EditDoctor from './Component/EditDoctor/EditDoctor';
import ViewAppointment from './Component/ViewAppointment/ViewAppointment';
import EditTime from './Component/EditTime/EditTime';
import EditMedicalHistory from './Component/EditMedicalHistory/EditMedicalHistory';
import ViewMedicalHistory from './Component/ViewMedicalHistory/ViewMedicalHistory';
import AddMedicalHistory from './Component/AddMedicalHistory/AddMedicalHistory';
import Pharmacist from './Component/Pharmacist/Pharmacist';
import Nurse from './Component/Nurse/Nurse';
import Radiologist from './Component/Radiologist/Radiologist';
import Labotariest from './Component/Labotariest/Labotariest';
import Accountant from './Component/Accountant/Accountant';
import Limit from './Component/Limit/Limit';
import Appointment from './Component/Appointment/Appointment';
import AddPrescription from './Component/AddPrescription/AddPrescription';
import EditPrescription from './Component/EditPrescription/EditPrescription';
import ViewPrescription from './Component/ViewPrescription/ViewPrescription';
import ViewPatientHistory from './Component/ViewPatientHistory/ViewPatientHistory';
import AddPharmacist from './Component/AddPharmacist/AddPharmacist';
import AllPharmacists from './Component/AllPharmacists/AllPharmacists';
import EditPharmacist from './Component/EditPharmacist/EditPharmacist';
import PharmacistDetails from './Component/PharmacistDetails/PharmacistDetails';
import AddRadiologist from './Component/AddRadiologist/AddRadiologist';
import AllRadiologists from './Component/AllRadiologists/AllRadiologists';
import RadiologistDetails from './Component/RadiologistDetails/RadiologistDetails';
import EditRadiologist from './Component/EditRadiologist/EditRadiologist';
import AddLaboratoriest from './Component/AddLaboratoriest/AddLaboratoriest';
import AllLaboratoriests from './Component/AllLaboratoriests/AllLaboratoriests';
import LaboratoriestDetails from './Component/LaboratoriestDetails/LaboratoriestDetails';
import EditLaboratoriest from './Component/EditLaboratoriest/EditLaboratoriest';
import AddAccountant from './Component/AddAccountant/AddAccountant';
import AllAccountant from './Component/AllAccountant/AllAccountant';
import AccountantDetails from './Component/AccountantDetails/AccountantDetails';
import EditAccountant from './Component/EditAccountant/EditAccountant';
import AddNurse from './Component/AddNurse/AddNurse';
import AllNurse from './Component/AllNurse/AllNurse';
import EditNurse from './Component/EditNurse/EditNurse';
import NurseDetails from './Component/NurseDetails/NurseDetails';
import AddEmployee from './Component/AddEmployee/AddEmployee';
import AllEmployee from './Component/AllEmployee/AllEmployee';
import EditEmployee from './Component/EditEmployee/EditEmployee';
import EmployeeDetails from './Component/EmployeeDetails/EmployeeDetails';
import AddRoom from './Component/AddRoom/AddRoom';
import AllPatients from './Component/AllPatients/AllPatients';
import AddMedicine from './Component/AddMedicine/AddMedicine';
import AllMedicines from './Component/AllMedicines/AllMedicines';
import EditMedicine from './Component/EditMedicine/EditMedicine';
import AddDisease from './Component/AddDisease/AddDisease';
import PatientPrescription from './Component/PatientPrescription/PatientPrescription';
import ViewRoom from './Component/ViewRoom/ViewRoom';
import AddX_rayReport from './Component/AddX_rayReport/AddX_rayReport';
import ViewX_rayReport from './Component/ViewX_rayReport/ViewX_rayReport';
import X_rayReportDetails from './Component/X_rayReportDetails/X_rayReportDetails';
import PatientX_ray from './Component/PatientX_ray/PatientX_ray';
import { Offline, Online} from "react-detect-offline";
import { LaboratoriestContextProvider } from './Context/LaboratoriestContext';
import LabReportDetails from './Component/LabReportDetails/LabReportDetails';
import AddLabReport from './Component/AddLabReport/AddLabReport';
import ViewLabReport  from './Component/ViewLabReport/ViewLabReport';
import PatientLab from './Component/PatientLab/PatientLab';
import PatientDetails from './Component/PatientDetails/PatientDetails';
import AllPrescription from './Component/AllPrescription/AllPrescription';
import AllX_rayReports from './Component/AllX_rayReports/AllX_rayReports';
import AllLabReports from './Component/AllLabReports/AllLabReports';
import DoctorPatient from './Component/DoctorPatient/DoctorPatient';
import AllRooms from './Component/AllRooms/AllRooms';
import ViewBookRoom from './Component/ViewBookRoom/ViewBookRoom';
import UpdateRoom from './Component/UpdateRoom/UpdateRoom';
import PharPatient from './Component/PharPatient/PharPatient';
import BuyMedicine from './Component/BuyMedicine/BuyMedicine';
import PatientXrayReport from './Component/PatientXrayReport/PatientXrayReport';
import PatientLabReport from './Component/PatientLabReport/PatientLabReport';
import PatientOrder from './Component/PatientOrder/PatientOrder';
import ViewPatientPay from './Component/ViewPatientPay/ViewPatientPay';
import ViewPatientNotPay from './Component/ViewPatientNotPay/ViewPatientNotPay';
import AllVitalSigns from './Component/AllVitalSigns/AllVitalSigns';
import UpdateVitalSigns from './Component/UpdateVitalSigns/UpdateVitalSigns';
import ViewAllPatients from './Component/ViewAllPatients/ViewAllPatients';
import AddVitalSigns from './Component/AddVitalSigns/AddVitalSigns';
import RestPassword from './Component/RestPassword/RestPassword';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import Dashboard from './Component/Dashboard/Dashboard';
import PatientVitalSigns from './Component/PatientVitalSigns/PatientVitalSigns';
import { AccountantContextProvider } from './Context/AccountantContext';
import { EmployeeContextProvider } from './Context/EmployeeContext';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import ViewMedications from './Component/ViewMedications/ViewMedications';
import VitalSigns from './Component/VitalSigns/VitalSigns';
import PayDetails from './Component/PayDetails/PayDetails';



function App() {
  const [userData,setUerData]=useState(null)
  function saveUserData(){
  let encodedToken = localStorage.getItem('Token');
  let decodedToken= jwtDecode(encodedToken);
  setUerData(decodedToken)
 
  }
  
 let parmas = useParams()
  let router =createBrowserRouter([
    {
      path:'',element:<Layout userData={userData} parmas={parmas}  setUerData={setUerData}/>,children:[
      {path:'HMS',element:<Login saveUserData={saveUserData}/>},
      {path:'ForgetPassword',element:<ForgetPassword />},
      {path:'RestPassword',element:<RestPassword />},
      
       {path:'Admin',element:<ProtectedRoute> <Admin saveUserData={saveUserData}/></ProtectedRoute>,children:[
       
        {path:'',element:<Dashboard />},
        {path:'AddDoctor',element:<AddDoctor  />},
        {path:'AllDoctors',element:<AllDoctors  />},
        {path:'DoctorDetails/:id',element:<DoctorDetails  />},
        {path:'EditDoctor/:id',element:<EditDoctor />},
        {path:'EditTime/:id',element:<EditTime />},

        {path:'AddPharmacist',element:<AddPharmacist />},
        {path:'AllPharmacists',element:<AllPharmacists />},
        {path:'EditPharmacist/:id',element:<EditPharmacist />},
        {path:'PharmacistDetails/:id',element:<PharmacistDetails />},
        
        {path:'AddRadiologist',element:<AddRadiologist />},
        {path:'AllRadiologists',element:<AllRadiologists />},
        {path:'RadiologistDetails/:id',element:<RadiologistDetails />},
        {path:'EditRadiologist/:id',element:<EditRadiologist />},

        {path:'AddLaboratoriest',element:<AddLaboratoriest />},
        {path:'AllLaboratoriests',element:<AllLaboratoriests />},
        {path:'LaboratoriestDetails/:id',element:<LaboratoriestDetails />},
        {path:'EditLaboratoriest/:id',element:<EditLaboratoriest />},

        {path:'AddAccountant',element:<AddAccountant />},
        {path:'AllAccountants',element:<AllAccountant />},
        {path:'AccountantDetails/:id',element:<AccountantDetails />},
        {path:'EditAccountant/:id',element:<EditAccountant />},

        {path:'AddNurse',element:<AddNurse />},
        {path:'AllNurses',element:<AllNurse />},
        {path:'EditNurse/:id',element:<EditNurse />},
        {path:'NurseDetails/:id',element:<NurseDetails/>},

        {path:'AddEmployee',element:<AddEmployee />},
        {path:'AllEmployees',element:<AllEmployee />},
        {path:'EditEmployee/:id',element:<EditEmployee />},
        {path:'EmployeeDetails/:id',element:<EmployeeDetails/>},
        
        {path:'AddRoom',element:<AddRoom />},
        {path:'AllRooms',element:<AllRooms />},
        {path:'UpdateRoom/:id',element:<UpdateRoom />},
        
        {path:'AllPatients',element:<AllPatients />},
        
      ]},
      {path:'Patient',element:<ProtectedRoute> <Patient saveUserData={saveUserData}/></ProtectedRoute>,children:[
        {path:'ViewDoctors',element:<ViewDoctors/>},
        {path:'BookDoctor/:id',element:<BookDoctor/>},
        {path:'ViewAppointment',element:<ViewAppointment/>},
        {path:'ViewMedicalHistory',element:<ViewMedicalHistory/>},
        {path:'PatientPrescription',element:<PatientPrescription/>},
        {path:'ViewRoom',element:<ViewRoom/>},  
        {path:'ViewBookRoom',element:<ViewBookRoom/>},
        {path:'PatientLabReport',element:<PatientLabReport/>},
        {path:'PatientXrayReport',element:<PatientXrayReport/>},
        {path:'VitalSigns',element:<VitalSigns/>},
        
      ]},
      {path:'Doctor',element:<ProtectedRoute><Doctor saveUserData={saveUserData}/></ProtectedRoute>,children:[
        {path:'ViewTiming',element:<ViewTiming  />},
        {path:'Limit',element:<Limit  />},
        {path:'Appointment',element:<Appointment  />},
        {path:'AddPrescription/:id',element:<AddPrescription  />},
        {path:'EditPrescription/:id',element:<EditPrescription  />},
        {path:'ViewPrescription/:id',element:<ViewPrescription  />},
        {path:'ViewPatientHistory/:id',element:<ViewPatientHistory  />},
        {path:'AddDisease/:id',element:<AddDisease  />},
        {path:'PatientDetails/:id',element:<PatientDetails  />},
        {path:'AllPrescription/:id',element:<AllPrescription  />},
        {path:'AllLabReports/:id',element:<AllLabReports/>},
        {path:'AllX_rayReports/:id',element:<AllX_rayReports  />},
        {path:'DoctorPatient',element:<DoctorPatient  />},
        {path:'AddMedicalHistory/:id',element:<AddMedicalHistory/>},
        {path:'EditMedicalHistory/:id',element:<EditMedicalHistory/>},
        {path:'PatientVitalSigns/:id',element:<PatientVitalSigns/>},

      ]},
      {path:'Pharmacist',element:<ProtectedRoute> <Pharmacist saveUserData={saveUserData}/> </ProtectedRoute>,children:[
        {path:'AddMedicine',element:<AddMedicine  />},
        {path:'AllMedicines',element:<AllMedicines  />},
        {path:'EditMedicine/:id',element:<EditMedicine  />},
        {path:'PharPatient',element:<PharPatient  />},
        {path:'BuyMedicine/:id',element:<BuyMedicine  />},
       
      ]},
      
      {path:'Nurse',element:<ProtectedRoute> <Nurse saveUserData={saveUserData}/></ProtectedRoute>,children:[

        {path:'ViewAllPatients',element:<ViewAllPatients  />},
        {path:'AddVitalSigns/:id',element:<AddVitalSigns  />},
        {path:'UpdateVitalSigns/:id',element:<UpdateVitalSigns  />},
        {path:'AllVitalSigns/:id',element:<AllVitalSigns  />},
        {path:'ViewMedications/:id',element:<ViewMedications  />},
        
      ]},
      {path:'Radiologist',element:<ProtectedRoute> <Radiologist saveUserData={saveUserData}/></ProtectedRoute>,children:[
        {path:'AddX_rayReport/:id',element:<AddX_rayReport  />},
        {path:'ViewX_rayReport',element:<ViewX_rayReport />},
        {path:'X_rayReportDetails/:id',element:<X_rayReportDetails  />},
        {path:'PatientX_ray',element:<PatientX_ray  />},
        
      ]},
      {path:'Labotariest',element:<ProtectedRoute><Labotariest saveUserData={saveUserData}/></ProtectedRoute>,children:[
        {path:'AddLabReport/:id',element:<AddLabReport  />},
        {path:'ViewLabReport',element:< ViewLabReport  />},
        {path:'LabReportDetails/:id',element:<LabReportDetails  />},
        {path:'PatientLab',element:<PatientLab  />},
      ]},
      {path:'Accountant',element:<ProtectedRoute> <Accountant saveUserData={saveUserData}/></ProtectedRoute>,children:[
        {path:'ViewPatientPay',element:<ViewPatientPay  />},
        {path:'ViewPatientNotPay',element:<ViewPatientNotPay  />},
        {path:'PatientOrder/:id',element:<PatientOrder  />},
        {path:'PayDetails',element:<PayDetails/>},
      ]},
      
      {path:'Register',element:<Register/>},
      {path:'*',element:<NotFound/>},
    
      ]}
  ])
  return<>
  <DoctorContextProvider>
    <RadiologistContextProvider>
  <PharmacistContextProvider>
  <PatientContextProvider>
  <NurseContextProvider>
  <LaboratoriestContextProvider> 
  <AccountantContextProvider>
  <EmployeeContextProvider>
  <Offline><div className='network bg-light fw-bold p-2'><i className="fa-solid fa-wifi text-danger"></i>you are offline</div> </Offline>
   <ToastContainer />
  <RouterProvider router={router}></RouterProvider>
  </EmployeeContextProvider>
  </AccountantContextProvider>
  </LaboratoriestContextProvider> 
  </NurseContextProvider>
  </PatientContextProvider>
  </PharmacistContextProvider>
  </RadiologistContextProvider>
  </DoctorContextProvider>
  </>
}

export default App;
