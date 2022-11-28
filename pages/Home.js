import { View, Text, ScrollView, useWindowDimensions, Image, Pressable, ActivityIndicator, Dimensions} from "react-native";
import React, {useState, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatGrid } from 'react-native-super-grid';
import {getDocs, collection, query, where, onSnapshot, } from 'firebase/firestore';
import {firestore} from './firebaseConfig/firebase';
import {onValue} from 'firebase/database'

import styles from "./styles";
import banner from '../assets/banner.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import Banner from '../components/Banner';
import Categories from "../components/Categories";
import Header from "../components/Header";
import Ionicons from '@expo/vector-icons/Ionicons';
import Logout from "../components/Logout";
import { auth } from "./firebaseConfig/firebase";
import * as Location from 'expo-location';
import { async } from "@firebase/util";

export default function Home({navigation}) {
    const {height,width} = useWindowDimensions();
    const [scrolled,setScrolled] = useState(false);
    const [offset, setOffset] = useState(width * 0.9);
    const [scrollCounter,setScrollCounter] = useState(1);
    const [isDone,setIsDone] = useState(false);
    const [isPopUp, setIsPopUp] = useState(false);
    const userId = auth.currentUser.uid;

    const scrollRef = useRef();
    function moreInfo(item){
        navigation.navigate('About',{
            item: item
        });
    }


    const [isLoading,setIsLoading] = useState(true);
    const [cartValue,setCartValue] = useState(0);

    async function getcCartData(){
        const collectionRef = collection(firestore, 'cart');
      
            try {
              let dataQuery = query(collectionRef, where("userId", "==", userId),where("status", "==", "Pending"));
              
              onSnapshot(dataQuery, (snapshot) => {
                let data= snapshot.docs.map((doc)=>({...doc.data()}));
                
                setCartValue(data.length);
                
              })
              
              
              
            // console.log('cart value:');
            }catch(e){
                console.log(e.message);
            
            }
            const interval = setTimeout(() => {
                setIsLoading(false);
             }, 10000)
            return () => clearInterval(interval);
    }

    useEffect(()=>{
        getcCartData();
    },[])

    const [items, setItems] = React.useState([]);
    const [filteringData,setFilteringData] = React.useState([]);

    async function getData() {
        const collectionRef = collection(firestore, 'food');

        try {
          let data = await getDocs(collectionRef).then((snapshot)=>snapshot.docs.map(doc=>({...doc.data(),docId:doc.id})));
            setItems(data);
            setFilteringData(data);
        }catch(e){
            console.log(e.message);
        }
    }
      useEffect(()=>{
        getData();
       
    },[])

    function filter(category) {
        if(category==='All'){
            setItems(filteringData);
        }else{
            setItems(filteringData.filter(item=>item.category===category));
        }
    }

      function like(id){
        let temp =  items.map(item=>{
                if(item.id === id){
                    return {
                        ...item, liked: !item.liked
                    }
                }
                return item;
            });
        
        setItems(temp);
      }

      function handleScroll(event){
        if(event.y > 205){
            setScrolled(true)
        }else{
            setScrolled(false);
        }
        
      }
      
      function manualScroll(event){
        const scrollValue = width * 0.9;
        let num = Math.round((parseFloat(event.x)/scrollValue)+1);
        setIsDone(false);
        setScrollCounter(num);
        setOffset(parseFloat(event.x));
      }

      function autoScroll(){
        const scrollValue = width * 0.9;
        if (scrollCounter > 0 &&scrollCounter < 3 && !isDone) {
            setOffset(prev => prev + scrollValue);
            scrollRef.current.scrollTo({ x: offset });
            setScrollCounter(prev => prev + 1);
            if (scrollCounter === 2) {
                setIsDone(true);
            } 
        } 
        else if(isDone || (!isDone&&scrollCounter===3)) {
            setOffset(scrollValue);
            scrollRef.current.scrollTo({ x: 0 });
            setScrollCounter(1);
            setIsDone(false);
        }

      }

     useEffect(()=>{
        // console.log(width * 0.9);
        if (scrollCounter === 1) {
            setIsDone(false);
        }
        if(scrollCounter === 2){
            
        }

        const interval = setTimeout(() => {
            autoScroll();
         }, 3000)
        return () => clearInterval(interval);
    },[scrollCounter,isDone])

    const images = [{
        img: banner,
    },
    {
        img: banner2,
    },
    {
        img: banner3,
    },
]
   
function toCart(){
    navigation.navigate('Cart')
  }

  function logout(){
    navigation.navigate('Login')
}

const [address, setAddress] = React.useState(null);

React.useEffect(() => {
  (async () => {
    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied!');
      return;
    }

    let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
    const address = await Location.reverseGeocodeAsync(location.coords);
    setAddress(address[0].city);
  })();
}, []);
  

  return (
    <SafeAreaView style={styles.container}>
        {isPopUp&&<Logout logout={logout} setIsPopUp={setIsPopUp} />}
        <View>
        
            <View style={{...styles.cover,width: width}} />
            <Header setIsPopUp={setIsPopUp} toCart={toCart} cartValue={cartValue} />
        </View>
        
        <ScrollView stickyHeaderIndices={[2]} onScroll={(e)=>handleScroll(e.nativeEvent.contentOffset)} nestedScrollEnabled showsVerticalScrollIndicator={false}>
        
            <View style={{
                flexDirection: 'row',
                width: Dimensions.get('window').width*0.3,
                height: Dimensions.get('window').height*0.05,
                elevation: 6,
                backgroundColor: '#fff',
                alignItems: 'center',
                borderRadius: 25,
                marginHorizontal: width * 0.05,
                paddingLeft: 10,
                marginTop: height*0.03
            }}>
                <Ionicons name="md-location-sharp" size={Dimensions.get('window').width*0.04} color="black" />
                <Text style={{fontSize: Dimensions.get('window').width*0.04}}>{address?address:'Location'}</Text>
            </View>
            <View style={{...styles.carouselContainer,height: height * 0.22}}>
                 <ScrollView 
                 style={{...styles.carouselScroller, width: width * 0.9}} 
                 showsHorizontalScrollIndicator={false} 
                 horizontal 
                 pagingEnabled
                 ref={scrollRef}
                 onMomentumScrollEnd={(e)=>manualScroll(e.nativeEvent.contentOffset)}
                 >{
                    images.map((item, index)=>{
                        return <Banner key={index} banner={item.img} />
                    })
                 }
                 </ScrollView>
                 <Text style={styles.counter}>{scrollCounter}/3</Text>
            </View>

            <View style={{width: width * 0.9, marginHorizontal: width * 0.05,backgroundColor:'#fff', position: 'relative'}}>
                <View style={[{...styles.cover,width: width,},scrolled?styles.shadow: styles.noShadow]} />
                <Text style={styles.catText}>Recomended for you.</Text>
                <Categories filter={filter} />
            </View>

            <View style={styles.foodContainer}>
                {filteringData.length===0&&isLoading?<ActivityIndicator size="large" color="#000000" />
                :filteringData.length===0&&!isLoading?
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 18,}}>Check internet connection</Text>
                    </View>
                :<FlatGrid
                    itemDimension={width * 0.3}
                    data={items}
                    style={styles.gridView}
                    spacing={width * 0.05}
                    renderItem={({ item }) => (
                        <Pressable onPress={()=>moreInfo(item)} style={[styles.itemContainer,{height: height * 0.27}]}>
                            <Image source={{uri: item.imgUrl}} style={{width: '90%', height: '50%', marginTop: '10%'}} />
                            <View style={styles.foodDetails}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemCode}>{item.title}</Text>
                                <Text style={styles.itemPrice}>R {item.price.toFixed(2)}</Text>
                            </View>
                            <Pressable style={styles.heart} onPress={()=>like(item.id)}>
                            <Ionicons name={item.liked?"md-heart":"md-heart-outline"} size={20} color="black" />
                            </Pressable>
                            
                        </Pressable>
                    )}
                />}{
                    items.length===0&&filteringData.length!==0&&<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: 'bold'}}>No items found</Text>
                    </View>
                }
            </View>
            
        </ScrollView>
    </SafeAreaView>
  );
}

