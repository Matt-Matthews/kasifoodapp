import { View, Text, Pressable, Dimensions, Image, StyleSheet, ActivityIndicator } from 'react-native';
import React,{useState} from 'react';
import { Ionicons } from '@expo/vector-icons';
import {collection, query,where, onSnapshot,addDoc, updateDoc,doc, getDocs} from 'firebase/firestore';
import {auth, firestore} from '../pages/firebaseConfig/firebase';

export default function MealCard({food,navigation}) {
    const url = 'https://firebasestorage.googleapis.com/v0/b/resturantapp-97a5e.appspot.com/o/resturants%2FPngItem_1979800.png?alt=media&token=2b804d08-4831-4ce2-9497-50f4f3d2f592';
    const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const userId = auth.currentUser.uid;
  

  const [initPrice,setInitPrice] = useState(food.price);
  const [totPrice,setTotPrice] = useState(initPrice);
  const [isLoading,setIsLoading] = useState(false);

  async function AddToCart(){
    setIsLoading(true);
    let orderNo = Math.floor(Math.random() * 1000);
    try{
      const collectionRef = collection(firestore, 'cart');
     
      let dataQuery = query(collectionRef, where("id", "==", food.id));

      let selectedItem = await getDocs(dataQuery).then((snapshot)=>snapshot.docs.map(doc=>({...doc.data(),docId:doc.id})));


      if(selectedItem.length > 0){
          selectedItem.forEach(food=>{
            if(food.userId === userId){
              let docRef = doc(firestore,`cart/${food.docId}`);
              updateDoc(docRef,{totPrice: totPrice}).then(()=>{
              setIsLoading(false);
            })
            }else {
              addDoc(collectionRef, {...food,userId: userId,totPrice: totPrice, status: 'Pending',orderNo:orderNo}).then(()=>{
                setIsLoading(false);
              })
            }
          }); 
          
      }else {
        await addDoc(collectionRef, {...food,userId: userId,totPrice: totPrice,status: 'Pending',orderNo:orderNo}).then(()=>{
          setIsLoading(false);
        })
      }
      
      
      
    }catch(e){
      console.log(e.message);
      setIsLoading(false);
    }
    
  }
  return (
    <View>
        <View style={cardStyles.container}>
        <Image source={{uri:food.imgUrl}} resizeMode='contain' 
            style={{
                width: width*0.2, 
                height: width*0.2,
                backgroundColor: 'gray',
                borderRadius: 10,
                marginRight: width*0.05,
        }} />
      <View style={{width: width*0.45}}>
        <Text>{food.name}</Text>
        <Text>{food.title}</Text>
      </View>

      <Text style={{width: width*0.13}}>R{food.price}</Text>
      {isLoading?<ActivityIndicator size="small" color="#000000" />
      :<Pressable onPress={AddToCart}>
      <Ionicons name="md-add-circle" size={Dimensions.get('window').width*0.07} color="black" />
    </Pressable>
      }
      
      
    </View>
    <View style={{width: width*0.9, height: 1, backgroundColor: 'gray',marginVertical: 10, opacity: 0.1}} />
    </View>
  )
}

const cardStyles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width*0.9,
        flexDirection: 'row',
        alignItems: 'center',
    },
})