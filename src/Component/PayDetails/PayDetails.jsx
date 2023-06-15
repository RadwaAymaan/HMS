import React, { useContext, useEffect, useState } from 'react'
import styles from './PayDetails.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AccountantContext } from '../../Context/AccountantContext';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import { PDFViewer, Document, Page, Text, StyleSheet,View,pdf } from '@react-pdf/renderer';
export default function PayDetails() {
  let{Pay,pagenum,num} = useContext(AccountantContext)
  const [user, setuser] = useState([])
  const [patient, setpatient] = useState([])
  const [products, setproducts] = useState([])
  const [date, setdate] = useState('')
  async function showPay(page){
    let {data} = await Pay(page)
    setpatient(data.Patients[num])
    setproducts(data.Patients[num].products)
    setuser(data.Patients[num].user)
    setdate(data.Patients[num].updatedAt.slice(0,10))
  }
  useEffect(()=>{ 
    showPay(pagenum)
   },[pagenum])


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
  
     <PDFViewer width="100%" height="80%" >
         <Document>
           <Page size="A5" style={styles.page}>
           
          
         <View style={styles.container2}>
         <View >
            <Text  style={styles.text1}>Patient Name:</Text>
        <View >
         <Text  style={styles.text}>{user.name}</Text>
         </View>
         
         </View>
         <View>
            <Text  style={styles.text1}>Payment Type:</Text>
        <View >
         <Text  style={styles.text}>{patient.paymentType}</Text>
         </View>
         </View>
         <View>
            <Text  style={styles.text1}>Date:</Text>
        <View >
         <Text  style={styles.text}>{date}</Text>
         </View>
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
    <View style={styles.container2}>
            <Text  style={styles.text1}>Final Price:</Text>
        <View >
         <Text  style={styles.text}>{patient.finalPrice}</Text>
         </View>
         
         </View>
      </Page>
        </Document>
        </PDFViewer>
        
  </>
}
