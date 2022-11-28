import { View, Dimensions, ScrollView, Text, } from 'react-native';
import React from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {collection, query, where, onSnapshot, getDocs, } from 'firebase/firestore';
import {auth, firestore} from './firebaseConfig/firebase';
import styles from './styles';
import Header from '../components/Header';
import Logout from '../components/Logout';
import TextField from '../components/TextField';
import ResturantCard from '../components/ResturantCard';


export default function Search({navigation}) {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [isPopUp, setIsPopUp] = React.useState(false);
  const [cartValue,setCartValue] = React.useState(0);
  const userId = auth.currentUser.uid;
  const [searchText,setSearchText] = React.useState('');

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

    React.useEffect(()=>{
        getcCartData();
    },[])

    function toCart(){
      navigation.navigate('Cart')
    }
  
    function logout(){
      navigation.navigate('Login')
  }

  function toAbout(item){
    navigation.navigate('ResturantAbout',{item: item});
  }

  const [resturants, setResturants] = React.useState([]);
  const [pemData,setPemData] = React.useState([]);

  async function getData() {
    const collectionRef = collection(firestore, 'resturants');

    try {
      let data = await getDocs(collectionRef).then((snapshot)=>snapshot.docs.map(doc=>({...doc.data(),docId:doc.id})));
      setResturants(data);
      setPemData(data);
    }catch(e){
        console.log(e.message);
    }
    
}
  React.useEffect(()=>{
    getData();
   
},[])

React.useEffect(()=>{
 if(searchText!==''){
  let temp = pemData.filter(item=>item.name.toLowerCase().substr(0,searchText.length)===searchText.toLowerCase());
  setResturants(temp);
 }else{
  setResturants(pemData)
 }
 

 
},[searchText])


  return (
    <SafeAreaView>
      {isPopUp&&<Logout logout={logout} setIsPopUp={setIsPopUp} />}
      <View>
            <View style={{...styles.cover,width: width}} />
            <Header setIsPopUp={setIsPopUp} toCart={toCart} cartValue={cartValue} />
      </View>
      <View style={{width:width, alignItems: 'center', marginTop: 20,backgroundColor: '#fff'}}>
          <TextField icon={'md-search-sharp'} setValue={setSearchText} placeholder="Search resturants" />
        </View>
      <View style={{height: height*0.75}}>
      <ScrollView style={{marginTop: 20}}>
        {
          resturants.length!==0?resturants.map(item=>{
            return <ResturantCard onPress={toAbout} item={item} />
          }):
          <Text>No data found.</Text>
        }
      </ScrollView>
      </View>

    </SafeAreaView>
  )
}

