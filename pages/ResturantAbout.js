import { View, Text, Dimensions, ScrollView, Image, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {collection, query, where, onSnapshot, } from 'firebase/firestore';
import {auth, firestore} from './firebaseConfig/firebase';
import styles from './styles';
import Header from '../components/Header';
import Logout from '../components/Logout';
import Ionicons from '@expo/vector-icons/Ionicons';
import MealCard from '../components/MealCard';
import SecHeader from '../components/SecHeader';

export default function ResturantAbout({navigation,route}) {

    const url = 'https://firebasestorage.googleapis.com/v0/b/resturantapp-97a5e.appspot.com/o/resturants%2FPngItem_1979800.png?alt=media&token=2b804d08-4831-4ce2-9497-50f4f3d2f592';
  
    const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [isPopUp, setIsPopUp] = React.useState(false);
  const [cartValue,setCartValue] = React.useState(0);
  const userId = auth.currentUser.uid;
  const {item} = route.params;
  


    async function getcCartData(){
        const collectionRef = collection(firestore, 'cart');
      
            try {
              let dataQuery = query(collectionRef, where("userId", "==", userId),where("status", "==", "Pending"));
              
              onSnapshot(dataQuery, (snapshot) => {
                let data= snapshot.docs.map((doc)=>({...doc.data()}));
                
                setCartValue(data.length);
                
              })
              
            }catch(e){
                console.log(e.message);
            
            }
            const interval = setTimeout(() => {
                
             }, 10000)
            return () => clearInterval(interval);
    }

    const [foodData,setFoodData] = React.useState([]);
    async function getData(){
      const collectionRef = collection(firestore, 'food');
      
            try {
              let dataQuery = query(collectionRef, where("resturantId", "==", item.resturandId));
              
              onSnapshot(dataQuery, (snapshot) => {
                let data= snapshot.docs.map((doc)=>({...doc.data()}));
                
                setFoodData(data);
                
              })
              
            }catch(e){
                console.log(e.message);
            
            }
            // console.log(foodData);
    }

    React.useEffect(()=>{
        getcCartData();
        getData();
    },[])

    function toCart(){
      navigation.navigate('Cart')
    }
  
    function logout(){
      navigation.navigate('Login')
  }
  function prevPage(){
    navigation.goBack();
  }


  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      {isPopUp&&<Logout logout={logout} setIsPopUp={setIsPopUp} />}
      <View>
            <View style={{...styles.cover,width: width}} />
            <SecHeader setIsPopUp={setIsPopUp} cartValue={cartValue} toCart={toCart} prevPage={prevPage} />
      </View>
      <View style={{backgroundColor: '#fff',height: height, width:width*0.9,marginHorizontal: width*0.05}}>
      <View style={{height: height*0.93}}>
        <ScrollView>
         
          <View style={{marginTop: height*0.03}}/>
        <Image source={{uri:item.banner}} resizeMode='cover' 
            style={{
                width: '100%', 
                height: height*0.2, 
                borderRadius: 25,
                backgroundColor: 'gray'
        }} />
        <View style={{marginTop: height*0.03}}/>
        <Text style={resturantStyles.heading}>
            {item.name}
        </Text>
        <View style={{marginTop: height*0.02}}/>
        <Text style={resturantStyles.deliv}>
            {item.description}
        </Text>
        <View style={{marginTop: height*0.02}}/>
        <View style={resturantStyles.location}>
            <Ionicons name="md-location-sharp" size={Dimensions.get('window').width*0.04} color="black" />
            <Text>
                Polokwane
            </Text>
        </View>
        <View style={{marginTop: height*0.05}}/>
        <View>
        <View style={{width: width*0.9, height: 1, backgroundColor: 'gray',marginVertical: 10, opacity: 0.1}} />
            
            {
              foodData.length!==0?foodData.map(food=>{
                return <MealCard food={food} />
              }): <Text>No data found.</Text>
            }
        </View>
          
        </ScrollView> 
        </View>
      </View>
    </SafeAreaView>
  )
}

const resturantStyles = StyleSheet.create({
    heading: {
        fontSize: Dimensions.get('window').width*0.06,
        fontWeight: 'bold',
    }, deliv:{
        fontSize: Dimensions.get('window').width*0.04,
    },
    location: {
        flexDirection: 'row',
        
    }
});