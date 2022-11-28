import { View, Text, useWindowDimensions, Image, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import styles from "../pages/styles";
import Ionicons from '@expo/vector-icons/Ionicons';
import {deleteDoc, collection, query,where, getDocs} from 'firebase/firestore';
import { firestore } from "../pages/firebaseConfig/firebase";

export default function Card({item}) {
    const {height, width} = useWindowDimensions();
    const [isLiked, setIsLiked] = React.useState(false);
    const [isremoved,setIsRemoved] = React.useState(false);

    // async function deleteItem() {
    //   const collectionRef = collection(firestore, 'cart');
    //   let dataQuery = query(collectionRef, where("id", "==", item.id));
    //   await deleteDoc(dataQuery).then(()=>alert('removed')).catch((e)=>{Alert.alert(e.message)});
    // }

    const deleteItem = async ()=>{
      const collectionRef = collection(firestore, 'cart');
      let dataQuery = query(collectionRef, where("id", "==", item.id));
      getDocs(dataQuery).then((snapshot)=>{
        snapshot.docs.forEach(doc=>{
          deleteDoc(doc.ref).then(()=>{
            // alert('removed');
            setIsRemoved(false);
          });
        })
      });
    }
    
  return (
    <Pressable style={{...styles.card, height: height * 0.2}}>
      
      <Pressable style={styles.icon} onPress={()=>setIsLiked(prev=>!prev)}><Ionicons name={isLiked?"md-heart":"md-heart-outline"}  size={20} color="black" /></Pressable>
    
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: item.imgUrl}} resizeMode='contain' style={{...styles.cardImg, height: height*0.1}} />
        <View>
        <Text style={styles.catPara}>{item.name}</Text>
        <View style={{height: height *0.02}} />
        <Text style={{fontSize: 12}}>{item.title}</Text>
        <View style={{height: height *0.01}} />
        <Text style={{fontSize: 16}}>R {item.totPrice.toFixed(2)}</Text> 
        </View>
      </View>
     {!isremoved?<Pressable onPress={()=>{deleteItem();setIsRemoved(true)}} style={{...styles.btnPos}}>
        <Text style={styles.secBtnBtnText}>Remove</Text>
     </Pressable>:<ActivityIndicator size="large" color="#000000" />}
    </Pressable>
  );
}
