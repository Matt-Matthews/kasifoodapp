import { View, Text,SafeAreaView, Image, useWindowDimensions, KeyboardAvoidingView, ScrollView, ActivityIndicator } from "react-native";
import React, {useState} from "react";
import TextField from "../components/TextField";
import styles from "./styles";
import logo from '../assets/logo.png';
import CustomeBtn from "../components/CustomeBtn";
import SecondaryBtn from "../components/SecondaryBtn";
import { auth, firestore } from "./firebaseConfig/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {collection, addDoc } from "firebase/firestore";
import PasswordInput from "../components/PasswordInput";

export default function Signup({navigation}) {
    const {height, width} = useWindowDimensions();
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [telNo,setTelNo] = useState('');
    const [password,setPassword] = useState('');
    const [confPassword,setConfPassword] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    function signin(){
        navigation.navigate('Login')
    }

    async function signUp() {
        const collectionRef = collection(firestore, 'users');
        if(firstName&&lastName&&email&&telNo&&password&&confPassword&&password===confPassword){
            setIsLoading(true);
            try{
                await createUserWithEmailAndPassword(auth,email,password).then((results)=>{
                    const userId = results.user.uid;
                    addDoc(collectionRef,{
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        telNo: telNo,
                        password: password,
                        userId: userId,
                    }).then(()=>{
                        navigation.navigate('Login');
                        setIsLoading(false);
                    })
                })
            }catch(e){
                alert(e.message);
            }
        }else{
            alert('complete the form')
        }
    }
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <KeyboardAvoidingView  style={{width: width, alignItems: 'center'}}>
                <View style={[styles.imgContainer,{marginTop: height* 0.1, marginBottom: height* 0.05}]}>
                    <Image source={logo} resizeMode='cover' style={{width: '37.5%', height: height*0.2}} />
                </View>

                <TextField icon='md-person-sharp' setValue={setFirstName} returnKeyType='next' placeholder='Firstname' />
                <TextField icon='md-person-sharp' setValue={setLastName} returnKeyType='next' placeholder='Lastname' />
                <TextField icon='md-mail' setValue={setEmail} returnKeyType='next' placeholder='Email' />
                <TextField icon='md-phone-portrait-outline' setValue={setTelNo} returnKeyType='next' placeholder='Mobile Number' />
                <PasswordInput icon='md-lock-closed' setValue={setPassword} returnKeyType='next' placeholder='Create password' />
                <PasswordInput icon='md-lock-closed' setValue={setConfPassword} returnKeyType='done' placeholder='Confirm password' />
                <View style={{marginTop: '7%'}} />
                <CustomeBtn name='Sign up' onPress={signUp} />
                {isLoading&&<ActivityIndicator size="large" color="#000000" />}
                <View style={{marginTop: '5%'}} />
                <SecondaryBtn name='Already have an account?' onPress={signin} />

            </KeyboardAvoidingView>
        </ScrollView>                                             
    </SafeAreaView>
  );
}
