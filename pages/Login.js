import { View, Text, SafeAreaView, Image, useWindowDimensions, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import TextField from "../components/TextField";
import styles from "./styles";
import logo from '../assets/logo.png';
import CustomeBtn from "../components/CustomeBtn";
import SecondaryBtn from "../components/SecondaryBtn";
import { auth } from "./firebaseConfig/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import PasswordInput from "../components/PasswordInput";

export default function Login({navigation}) {
    const {height, width} = useWindowDimensions();
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [isLoading,setIsLoading] = useState(false);
    
   async function login(){
      
      if(email&&password){
        setIsLoading(true);
        try{
          await signInWithEmailAndPassword(auth,email.trim(),password).then(()=>{
            navigation.navigate('BottomNav');
            setIsLoading(false);
          })
        }catch(e){
          alert(e.message);
          setIsLoading(false);
        }
        
      }else{
        alert('complete the form');
      }
    }

    function signup(){
      navigation.navigate('Signup')
    }
  return (
    <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={{width: width, alignItems: 'center', flex: 1}}>
            <View style={styles.imgContainer}>
                <Image source={logo} resizeMode='contain' style={{width: '50%'}} />
            </View>
            <TextField setValue={setEmail} icon='md-mail' returnKeyType='next' name='email' placeholder='Email' />
            <PasswordInput setValue={setPassword} password={true} icon='md-lock-closed' returnKeyType='done' name='password' placeholder='Password' />
            <View style={{marginTop: '15%'}} />
            <CustomeBtn name='Sign in' onPress={login} />
            {isLoading&&<ActivityIndicator size="large" color="#000000" />}
            <View style={{marginTop: '6%'}} />
            <SecondaryBtn name='Forgot Password?' />
            <SecondaryBtn name='Dont have an account?' onPress={signup} />

        </KeyboardAvoidingView>                                             
    </SafeAreaView>
  );
}
