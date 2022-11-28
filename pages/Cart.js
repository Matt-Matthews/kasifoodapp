import { View, Text, SafeAreaView, ScrollView, useWindowDimensions, ActivityIndicator } from "react-native";
import React, {useState, useEffect} from "react";
import styles from "./styles";
import SecHeader from "../components/SecHeader";
import CustomeBtn from "../components/CustomeBtn";
import Card from "../components/Card";
import Logout from "../components/Logout";
import {getDocs, collection, query,where, onSnapshot} from 'firebase/firestore';
import {auth, firestore} from './firebaseConfig/firebase';

export default function Cart({navigation}) {
    const {height, width} = useWindowDimensions();
    const [isPopUp, setIsPopUp] = useState(false);
    const [cartData,setCardData] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoading,setIsLoading] = useState(true);
    function toPayment(){
       if(cartValue !== 0){ navigation.navigate('Payment',{
          totalPrice: totalPrice,
        })}else return
      }
      function prevPage(){
        navigation.goBack();
      }
      function logout(){
        navigation.navigate('Login')
    }
    
    const userId = auth.currentUser.uid;

  async function getData() {
    const collectionRef = collection(firestore, 'cart');

    try {
      let dataQuery = query(collectionRef, where("userId", "==", userId),where("status", "==", "Pending"));
      
      onSnapshot(dataQuery, (snapshot) => {
        let data= snapshot.docs.map((doc)=>({...doc.data()}));
        
        setCardData(data);
      })
      
      
    }catch(e){
        console.log(e.message);
        setIsLoading(false);
    }
}

  useEffect(()=>{
    
    getData();
    const interval = setTimeout(() => {
      setIsLoading(false);
   }, 10000)
  return () => clearInterval(interval);
},[])

const [cartValue,setCartValue] = useState(0);
useEffect(()=>{
  const collectionRef = collection(firestore, 'cart');
  
        try {
          let dataQuery = query(collectionRef, where("userId", "==", userId),where("status", "==", "Pending"));
          
          onSnapshot(dataQuery, (snapshot) => {
            let data= snapshot.docs.map((doc)=>({...doc.data(), id: doc.id}));
          
            setCartValue(data.length);
          })
          
          
        //   console.log(data.length);
          
        }catch(e){
            console.log(e.message);
        
        }
},[])

useEffect(()=>{
  let temp = 0;
  for(let i = 0;i<cartData.length;i++){
   temp = temp + parseFloat(cartData[i].totPrice)
  }
  setTotalPrice(temp)
},[cartData])
  return (
    <SafeAreaView style={styles.container}>
      {isPopUp&&<Logout logout={logout} setIsPopUp={setIsPopUp} />}
        <View style={{marginTop: '8%'}}>
        
        <SecHeader setIsPopUp={setIsPopUp} cartValue={cartValue} prevPage={prevPage} />
       
        <ScrollView style={{width: width, height: height*0.80,}}>
        <Text style={{...styles.catText, marginLeft: '5%'}}>Cart</Text>
        {cartData.length===0&&isLoading?
        <ActivityIndicator size="large" color="#000000" />:cartData.length===0&&!isLoading?
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>No items found</Text>
                        <Text>or no internet connection</Text>
                    </View>
        :cartData.map((item,index)=>{
          return  <Card key={index} item={item} />
        })
        
        }
        
        </ScrollView>
        <View style={{elevation: 6, backgroundColor:'#fff'}}>
        <View style={{width: width*0.9, marginHorizontal: width*0.05}}>
            <Text style={styles.catPara}>Total Price: R{totalPrice.toFixed(2)}</Text>
            <View style={{height: height *0.05}} />
        </View>
        
        <CustomeBtn name='Checkout' onPress={toPayment} />
        <View style={{height: height *0.05, width: '100%', backgroundColor: '#fff'}} />
        </View>
        </View>
    </SafeAreaView>
  );
}
