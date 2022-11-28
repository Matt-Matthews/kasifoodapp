import { View, Text, SafeAreaView, ScrollView, Image, useWindowDimensions, Pressable, ActivityIndicator } from "react-native";
import React, {useEffect, useState} from "react";
import styles from "./styles";
import SecHeader from "../components/SecHeader";
import CustomeBtn from "../components/CustomeBtn";
import { Ionicons } from "@expo/vector-icons";
import Logout from "../components/Logout";
import {collection, query,where, onSnapshot,addDoc, updateDoc,doc, getDocs} from 'firebase/firestore';
import {auth, firestore} from './firebaseConfig/firebase';
import { async } from "@firebase/util";


export default function About({navigation,route}) {
  const {height, width} = useWindowDimensions();
  const [isPopUp, setIsPopUp] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const userId = auth.currentUser.uid;

  const {item} = route.params;


  const [initPrice,setInitPrice] = useState(item.price);
  const [totPrice,setTotPrice] = useState(initPrice);


  function handleQuantity(sign){
    if(sign==='-'){
      if(quantity != 1){
        setQuantity(prev=>prev - 1)
        setTotPrice(prev => prev - initPrice)
      }
    }else {
      setQuantity(prev=>prev + 1)
      setTotPrice(prev => prev + initPrice)
    }
  }

  function toCart(){
    
        navigation.navigate('Cart');
    
  }
  async function AddToCart(){
    setIsLoading(true);
    let orderNo = Math.floor(Math.random() * 1000);
    try{
      const collectionRef = collection(firestore, 'cart');
     
      let dataQuery = query(collectionRef, where("id", "==", item.id));

      let selectedItem = await getDocs(dataQuery).then((snapshot)=>snapshot.docs.map(doc=>({...doc.data(),docId:doc.id})));

      console.log(selectedItem.length);

      if(selectedItem.length > 0){
          selectedItem.forEach(food=>{
            if(food.userId === userId){
              let docRef = doc(firestore,`cart/${food.docId}`);
              updateDoc(docRef,{totPrice: totPrice}).then(()=>{
              setIsLoading(false);
              navigation.navigate('Cart');
            })
            }else {
              addDoc(collectionRef, {...item,userId: userId,totPrice: totPrice,status: 'Pending',orderNo:orderNo}).then(()=>{
                setIsLoading(false);
                navigation.navigate('Cart');
              })
            }
          }); 
          
      }else {
        await addDoc(collectionRef, {...item,userId: userId,totPrice: totPrice,status: 'Pending',orderNo:orderNo}).then(()=>{
          setIsLoading(false);
          navigation.navigate('Cart');
        })
      }
      
      
      
    }catch(e){
      console.log(e.message);
      setIsLoading(false);
    }
    
  }
  function prevPage(){
    navigation.goBack();
  }
  function logout(){
    navigation.navigate('Login')
}

const [cartValue,setCartValue] = useState(0);

useEffect(()=>{
  const collectionRef = collection(firestore, 'cart');
  
        try {
          let dataQuery = query(collectionRef, where("userId", "==", userId));
          
          onSnapshot(dataQuery, (snapshot) => {
            let data= snapshot.docs.map((doc)=>({...doc.data()}));
            
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
        <ScrollView>
          <View style={styles.infoImgCont}>
            <Image source={{uri: item.imgUrl}} resizeMode="contain" style={{width: width* 0.75, height: height* 0.3}} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.infoHeader}>
              <Text style={styles.catPara}>{item.name}</Text>
              <Pressable onPress={()=>setIsLiked(prev=>!prev)}>
                <Ionicons name={isLiked?"md-heart":"md-heart-outline"} size={20} color="black" />
              </Pressable>
              {/* "md-heart-outline" */}
            </View>
            <View style={{height: height *0.02}} />
            <Text style={{fontSize: 16}}>{item.title}</Text>
            <View style={{height: height *0.01}} />
            <Text>{item.description}
            </Text>
            <View style={{height: height *0.01}} />
            <Text style={{fontSize: 16}}>R {item.price.toFixed(2)}</Text>
            <View style={{height: height *0.04}} />
            <View style={styles.quantity}>
              <Text style={{fontSize: 16}}>Quantity: </Text>
              <View style={styles.quantityBtns}>
                <Pressable onPress={()=>handleQuantity('-')} style={styles.quantityBtn}>
                  <Text style={styles.quantityBtnTxt}>-</Text>
                </Pressable>
                <Text>{quantity}</Text>
                <Pressable onPress={()=>handleQuantity('+')} style={styles.quantityBtn}>
                  <Text style={styles.quantityBtnTxt}>+</Text>
                </Pressable>
              </View>
            </View>
            <View style={{height: height *0.05}} />
            <Text style={styles.catPara}>Total Price: R{totPrice.toFixed(2)}</Text>
            <View style={{height: height *0.05}} />
          </View>

          <CustomeBtn name='Add to cart' onPress={AddToCart} />
          {isLoading&&<ActivityIndicator size="large" color="#000000" />}
        </ScrollView>
        </View>
    </SafeAreaView>
  );
}
