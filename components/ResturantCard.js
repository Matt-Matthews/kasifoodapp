import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'react-native';

export default function ResturantCard({onPress, item}) {
    const url = 'https://firebasestorage.googleapis.com/v0/b/resturantapp-97a5e.appspot.com/o/resturants%2FPngItem_1979800.png?alt=media&token=2b804d08-4831-4ce2-9497-50f4f3d2f592';
  
  return (
    <Pressable onPress={()=>onPress(item)} style={{...searchStyles.searchCard}}>
    <Image source={{uri:item.banner}} resizeMode='cover' 
    style={{
        width: '100%', 
        height: '100%',
        borderRadius: 25
        }} />
        <View style={searchStyles.glassDet}>
          <Text style={searchStyles.heading}>
           {item.name}
          </Text>
          <Text style={searchStyles.desc}>
            {item.description}
          </Text>
        </View>
  </Pressable>
  )
};

const searchStyles = StyleSheet.create({
    searchCard: {
      width: Dimensions.get('window').width*0.9,
      height: Dimensions.get('window').height*0.25,
      backgroundColor: '#fff',
      marginHorizontal: Dimensions.get('window').width*0.05,
      borderRadius: 25,
      elevation: 6,
      marginBottom: 15,
      position: 'relative'
    },
    glassDet:{
      position: 'absolute',
      width: '100%',
      height: '40%',
      backgroundColor: 'rgba(0,0,0,0.32)',
      bottom: 0,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      padding: 10,
    },
    heading: {
      color: "white",
      fontSize: Dimensions.get('window').width*0.05,
      fontWeight: 'bold',
    },
    desc: {
      fontSize: Dimensions.get('window').width*0.037,
      marginTop: Dimensions.get('window').width*0.01,
      color: '#fff'
    }
    
  });