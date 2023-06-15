import React, { useContext, useEffect, useState } from 'react'
import styles from './PatientOrder.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AccountantContext } from '../../Context/AccountantContext';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import { PDFViewer, Document, Page, Text, StyleSheet,View,pdf } from '@react-pdf/renderer';
export default function PatientOrder() {

  let navigate = useNavigate()
  let parmas = useParams()
  let{showOrders,payBill} = useContext(AccountantContext)
  const [Details, setDetails] = useState([])
  const [products, setproducts] = useState([])
  const [user,setUerData]=useState('')
  const [file, setfile] = useState([])
  const [isLoading,setLoading]=useState(false)

  function UserData(){
  let encodedToken = localStorage.getItem('Token');
  let decodedToken= jwtDecode(encodedToken);
  setUerData(decodedToken)
  Order(parmas.id)
  
  
  }
  async function Order(id) {
    let {data}=await showOrders(id)  
    setDetails(data.data)
    setproducts(data.data.products)
  }

  async function pay(id) {
    setLoading(true)
    let {data}=await payBill(id)

    if (data.message === 'success')
       {
        generatePDF() 
         setLoading(false)
         toast.success('Success message');
         
         navigate(`/Accountant/ViewPatientPay`)
       }
  }
  useEffect(()=>{
   
    UserData()
   },[])

 
  const generatePDF = async () => {
    
    const divContent = document.getElementById('custom-div').innerText;

   
  //     const MyDocument = () => (
       
  //       <Document>
  //          <Page size="A5" style={styles.page}>
  //          <View style={styles.container2}>
  //           <Text  style={styles.text1}>Accountant Name:</Text>
  //       <View >
  //        <Text  style={styles.text}>{user.name}</Text>
  //        </View>
         
  //        </View>
  //          <View style={styles.container2}>
  //           <Text  style={styles.text1}>Final Price:</Text>
  //       <View >
  //        <Text  style={styles.text}>{Details.finalPrice}</Text>
  //        </View>
         
  //        </View>
  //        {products.map((product,index)=>{
  //         return<>
  //     <View style={styles.container2}>
  //           <Text  style={styles.text1}>Product Name:</Text>
  //       <View >
  //        <Text  style={styles.text}>{product.name.slice(0,20)}</Text>
  //        </View>
         
         
  //           <Text  style={styles.text1}>Price:</Text>
  //       <View >
  //        <Text  style={styles.text}>{product.Price}</Text>
  //        </View>
         
         
  //           <Text  style={styles.text1}>quantity:</Text>
  //       <View >
  //        <Text  style={styles.text}>{product.quantity}</Text>
  //        </View>
         
  //        </View>
  // </>
  //   })}
  //     </Page>
  //       </Document>
        

  //     );
  
      
  const styles = StyleSheet.create({
    page: { backgroundColor: 'white' },
    container2:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
        marginTop:10,
        borderBottomWidth:1,
        borderColor:'black'
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10,
      marginBottom:10,
    },
    text1: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#09c',
      marginRight: 30,
      marginBottom:10,
      
    },
  });
    // const blob = pdf(<MyDocument/>).toBlob();
    //  console.log(blob)
    
    // saveAs(blob, 'div_content.pdf');

  
  };
 
  const styles = StyleSheet.create({
    page: { backgroundColor: 'white' },
    container2:{
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
        marginTop:10,
        borderBottomWidth:1,
        borderColor:'black'
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      marginRight: 10,
      marginBottom:10,
    },
    text1: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#09c',
      marginRight: 30,
      marginBottom:10,
      
    },
  });
  return<>
   <div className="bg-opacity-75 bg-light mt-5 m-auto p-3 rounded">
<div className=""id='custom-div'>
   <div className='w-75 m-auto d-flex justify-content-around align-items-center bg-opacity-75 bg-light rounded p-3 mt-3 '>
    <div className='col-md-6  d-flex '>
          <label className='fw-bold fs-4 ' htmlFor="">Accountant Name:</label>
          <h2 className='h4 mt-1 ms-1'>{user.name}</h2>
          </div> 
    <div className='col-md-5 d-flex '>
          <label className='fw-bold fs-4 ' htmlFor="">Final Price:</label>
          <h2 className='h4 mt-1 ms-1'>{Details.finalPrice}</h2>
          </div> 
          </div>
     
        {products.map((product,index)=>(
        <div className='w-75 m-auto d-flex justify-content-around align-items-center flex-wrap bg-opacity-75 bg-light rounded p-3 mt-2 mb-1'>
        <div className='col-md-6  d-flex '>
              <label className='fw-bold fs-4 ' htmlFor="">Product Name:</label>
              <h2 className='h4 mt-1 ms-1 '>{product.name.slice(0,20)}</h2>
              </div> 
        <div className='col-md-3 d-flex '>
              <label className='fw-bold fs-4 ' htmlFor=""> Price:</label>
              <h2 className='h4 mt-1 ms-1 '>{product.Price}</h2>
              </div> 
        <div className='col-md-3 d-flex '>
              <label className='fw-bold fs-4 ' htmlFor=""> quantity:</label>
              <h2 className='h4 mt-1 ms-1 '>{product.quantity}</h2>
              </div> 
              </div>
        ))}
</div>
      
      <div className="w-50 p-2 m-auto  text-center mt-3">
          {isLoading?<button className='btn btn-outline-primary  text-black '><i className='fas fa-spinner fa-spin'></i></button>:
       <button  type='submit'onClick={()=>{pay(parmas.id)}} className='btn  btn-outline-primary fw-bold text-black'>Check Out</button>}
          </div>  
      
     </div>
     {/* <PDFViewer width="100%" height="600px">
         <Document>
           <Page size="A5" style={styles.page}>
           <View style={styles.container2}>
            <Text  style={styles.text1}>Accountant Name:</Text>
        <View >
         <Text  style={styles.text}>{user.name}</Text>
         </View>
         
         </View>
           <View style={styles.container2}>
            <Text  style={styles.text1}>Final Price:</Text>
        <View >
         <Text  style={styles.text}>{Details.finalPrice}</Text>
         </View>
         
         </View>
         {products.map((product,index)=>{
          return<>
      <View style={styles.container2}>
        <View>
            <Text  style={styles.text1}>Product Name:</Text>
        <View >
         <Text  style={styles.text}>{product.name.slice(0,20)}</Text>
         </View>
         </View>
         <View>
            <Text  style={styles.text1}>Price:</Text>
        <View >
         <Text  style={styles.text}>{product.Price}</Text>
         </View>
         </View>
         <View>
            <Text  style={styles.text1}>quantity:</Text>
        <View >
         <Text  style={styles.text}>{product.quantity}</Text>
         </View>
         </View>
         </View>
  </>
    })}
      </Page>
        </Document>
        </PDFViewer>
        <div className="w-50 p-2 m-auto  text-center mt-2 bg-opacity-75 bg-light rounded">
          {isLoading?<button className='btn btn-outline-primary  text-black '><i className='fas fa-spinner fa-spin'></i></button>:
       <button  type='submit'onClick={()=>{
      
        pay(parmas.id)}} className='btn  btn-outline-primary fw-bold text-black'>Check Out</button>}
          </div>  */}
  </>
}







