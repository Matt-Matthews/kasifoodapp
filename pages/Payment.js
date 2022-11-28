import { View, Text, SafeAreaView, useWindowDimensions, ActivityIndicator } from "react-native";
import React, {useEffect, useState} from "react";
import SecHeader from "../components/SecHeader";
import styles from "./styles";
import PaymentInput from "../components/PaymentInput";
import CustomeBtn from "../components/CustomeBtn";
import Logout from "../components/Logout";
import {updateDoc, collection, query,where,getDocs, onSnapshot} from 'firebase/firestore';
import {auth, firestore} from './firebaseConfig/firebase';

export default function Payment({navigation,route}) {
    const {height, width} = useWindowDimensions();
    const [isPopUp, setIsPopUp] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const userId = auth.currentUser.uid;

    const[bankName,setBankName] = useState('');
    const[cvv,setCvv] = useState('');
    const [cardNo,setCardNo] = useState('');
    const [expiryDate,setExpiryData] = useState('');

    const {totalPrice} = route.params;
    function toCart(){
        navigation.navigate('Cart')
      }
      function prevPage(){
        navigation.goBack();
      }
      function logout(){
        navigation.navigate('Login')
    }

    function pay(){
     if(bankName&&cvv&&cardNo&&expiryDate){ setIsLoading(true)
      const collectionRef = collection(firestore, 'cart');
      let dataQuery = query(collectionRef, where("userId", "==", userId),where("status", "==", "Pending"));
      try{
        getDocs(dataQuery).then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
          updateDoc(doc.ref,{status: 'Preparing'}).then(()=>{
            setIsLoading(false);
            navigation.navigate('Home')
          });
        })
      });
      }catch(e){
        console.log(e.message);
      }}else alert('Enter all fields')
      
    }

    const [cartValue,setCartValue] = useState(0);
   
useEffect(()=>{
  const collectionRef = collection(firestore, 'cart');
  
        try {
          let dataQuery = query(collectionRef, where("userId", "==", userId),where("status", "==", "Pending"));
          
          onSnapshot(dataQuery, (snapshot) => {
            let data= snapshot.docs.map((doc)=>({...doc.data(), id: doc.id}));
            console.log(data);
            setCartValue(data.length);
          })
          
          
        //   console.log(data.length);
          
        }catch(e){
            console.log(e.message);
        
        }
},[])

  return (
    <SafeAreaView style={styles.container}>
      {isPopUp&&<Logout logout={logout} setIsPopUp={setIsPopUp} />}
        <View style={{marginTop: '8%'}}>
        
        <SecHeader setIsPopUp={setIsPopUp} cartValue={cartValue} toCart={toCart} prevPage={prevPage} />
        <Text style={{...styles.catText, marginLeft: '5%'}}>Payment</Text>
        <View style={{width: '100%', alignItems: 'center'}}>
            <PaymentInput placeholder='Bank name' num={false}  setValue={setBankName} />
            <PaymentInput placeholder='Card number' num={true} setValue={setCardNo} />
            <PaymentInput placeholder='Cvv' num={true} setValue={setCvv} />
            <PaymentInput placeholder='Expiry date' num={false} setValue={setExpiryData} />
        </View>
        <View style={{height: height *0.05}} />
        <Text style={{...styles.catPara, marginLeft: '5%'}}>Total Price: R{totalPrice.toFixed(2)}</Text>
        <View style={{height: height *0.05}} />
        <CustomeBtn name='Pay' onPress={()=>pay()} />
        </View>
        {isLoading&&<ActivityIndicator size="large" color="#000000" />}
    </SafeAreaView>
  );
}
