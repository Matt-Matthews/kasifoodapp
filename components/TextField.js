import { View, Text, useWindowDimensions, TextInput, Pressable } from "react-native";
import React from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../pages/styles";
import { sendSignInLinkToEmail } from "firebase/auth";

export default function TextField({icon, placeholder,returnKeyType, name,setValue}) {
    const {height, width} = useWindowDimensions();
  return (
    <View style={[styles.textField, {backgroundColor: '#fff'}]}>
      <Ionicons name={icon} size={20} color="black" />
      <TextInput style={styles.textInput} s nativeID={name} onChangeText={text=>setValue(text)} returnKeyType={returnKeyType} placeholder={placeholder}  />
      
    </View>
  );
}
