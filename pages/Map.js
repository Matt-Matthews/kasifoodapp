import { View, Text, Dimensions, ActivityIndicator, Image } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { auth } from './firebaseConfig/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Logout from '../components/Logout';
import styles from './styles';
import {getDocs, collection, query, where, onSnapshot, } from 'firebase/firestore';
import {firestore} from './firebaseConfig/firebase';
import mapStyles from '../components/mapStyles.json';
import * as Location from 'expo-location';
import TextField from '../components/TextField';
import marker from '../assets/marker/marker.png';

export default function Map({navigation}) {

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [isPopUp, setIsPopUp] = React.useState(false);
  const [cartValue,setCartValue] = React.useState(0);
  const userId = auth.currentUser.uid;

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

  const [location, setLocation] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied!');
        return;
      }

      try{
        let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
        setLocation(location.coords);
      }catch(e){
        setIsLoading(false);
      }
      
      
    })();

    
  }, []);

  React.useEffect(()=>{
    if(location!== null){
      setIsLoading(false);
    }else{
      setIsLoading(true);
    }
  },[location])

  const [searchText,setSearchText] = React.useState('');
  const [resturants, setResturants] = React.useState([]);
  const [filterData,setFilterData] = React.useState([]);

  async function getData() {
    const collectionRef = collection(firestore, 'resturants');

    try {
      let data = await getDocs(collectionRef).then((snapshot)=>snapshot.docs.map(doc=>({...doc.data(),docId:doc.id})));
      setResturants(data);
        setFilterData(data);
        // setIsLoading(false);
    }catch(e){
        console.log(e.message);
    }
    console.log(resturants);
}
  React.useEffect(()=>{
    getData();
   
},[])
// const [searchText,setSearchText] = React.useState('');
React.useEffect(()=>{
  if(searchText!==''){
   let temp = filterData.filter(item=>item.name.toLowerCase().substr(0,searchText.length)===searchText.toLowerCase());
   setResturants(temp);
  }else{
   setResturants(filterData)
  }
  
 
  
 },[searchText])


  return (
    <SafeAreaView style={{position: 'relative'}}>
      {isPopUp&&<Logout logout={logout} setIsPopUp={setIsPopUp} />}
      <View>
            <View style={{...styles.cover,width: width}} />
            <Header setIsPopUp={setIsPopUp} toCart={toCart} cartValue={cartValue} />
        </View>
        
        {isLoading?<View style={{width: width, height: height*0.92, justifyContent:'center',alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#000000" />
        </View>:
        <MapView
        zoomEnabled 
        style={{width: width, height: height*0.92}} 
        initialRegion={{
          latitude: location? parseFloat(location.latitude) : -23.9168558,
            longitude: location? parseFloat(location.longitude) : 29.4576678,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0421,
          
        }}
        customMapStyle={mapStyles}
        followsUserLocation
        showsUserLocation={true}
        
        >
          {
            resturants.length!==0&&resturants.map(item=>{
              return <Marker style={{width: 100}} coordinate={{latitude: item.location.latitude, longitude: item.location.longitude,}}>
              <Image source={marker} resizeMode='contain' style={{width: 30, height: 30}} />
              {/* <View style={{height: 20, width: 20, backgroundColor: 'red'}} /> */}
            </Marker>
            })
          }
            
            

        </MapView>}
        <View style={{position: 'absolute', width:width, alignItems: 'center', top: 140}}>
          <TextField icon={'md-search-sharp'} setValue={setSearchText}  placeholder="Search resturants" />
        </View>
    </SafeAreaView>
  )
}