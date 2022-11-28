import { View, Text, useWindowDimensions, TextInput, Pressable } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../pages/styles";
import { sendSignInLinkToEmail } from "firebase/auth";

export default function PasswordInput({icon, placeholder,returnKeyType, name,setValue,}) {
    const {height, width} = useWindowDimensions();
    const [hide,setHide] = React.useState(true)
  return (
    <View style={[styles.textField, {backgroundColor: '#fff'}]}>
      <Ionicons name={icon} size={20} color="black" />
      <TextInput style={styles.textInput} secureTextEntry={hide} nativeID={name} onChangeText={text=>setValue(text)} returnKeyType={returnKeyType} placeholder={placeholder}  />
      <Pressable onPress={()=>setHide(prev=>!prev)}>
          <Ionicons name={hide?'md-eye-off-sharp':'md-eye-sharp'} size={25} color="black" />
        </Pressable>
      
    </View>
  );
}
