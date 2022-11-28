import { View, Text, useWindowDimensions, Pressable } from "react-native";
import React from "react";
import styles from "../pages/styles";

export default function Logout({setIsPopUp,logout}) {

    const {height} = useWindowDimensions();
    
  return (
    <Pressable onPress={()=>setIsPopUp(false)} style={{...styles.popUp, height: height*0.95}}>
      <View style={styles.popUpMenu}>
        <Pressable onPress={logout}>
            <Text>Logout</Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
