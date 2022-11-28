import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import styles from "../pages/styles";
import logo from '../assets/logo3.png';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from "../pages/firebaseConfig/firebase";

export default function Header({cartValue, toCart, setIsPopUp}) {

  function logout(){
    auth.signOut();
  }
  
  return (
    <View style={styles.header}>
                <Image source={logo} style={styles.img} />
                <View style={styles.icons}>
                    <Pressable  onPress={toCart} style={styles.cart}>
                    <Ionicons name="md-cart" size={32} color="black" />
                    {cartValue>0&&<View style={styles.value}>
                        <Text style={styles.valueText}>{cartValue}</Text>
                    </View>}
                    </Pressable>
                    <Pressable onPress={()=>{setIsPopUp(prev=>!prev);logout()}}>
                      <Ionicons name="md-ellipsis-vertical" size={32} color="black" />
                    </Pressable>
                </View>
    </View>
  );
}
