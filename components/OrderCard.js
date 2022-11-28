import { View, Text, StyleSheet, Dimensions, Pressable, Image } from 'react-native'
import React from 'react';

export default function OrderCard({data}) {
    const url = 'https://firebasestorage.googleapis.com/v0/b/resturantapp-97a5e.appspot.com/o/resturants%2FPngItem_1979800.png?alt=media&token=2b804d08-4831-4ce2-9497-50f4f3d2f592';
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
  return (
    <Pressable  style={{...searchStyles.searchCard}}>
        <View 
            style={{
                flexDirection: 'row',
                alignItems: 'center',

            }}>
        <Image source={{uri:data.imgUrl}} resizeMode='contain' 
            style={{
                width: width*0.2, 
                height: width*0.2,
                marginHorizontal:width*0.05
            }} />
        <View >
          <Text style={searchStyles.heading}>
            Order no: {data.orderNo}
          </Text>
          <Text style={searchStyles.desc}>
           R{data.price}
          </Text>
          <Text>Status: {data.status}</Text>
        </View>
        </View>
  </Pressable>
  )
}
const searchStyles = StyleSheet.create({
    searchCard: {
      width: Dimensions.get('window').width*0.9,
      height: Dimensions.get('window').height*0.17,
      backgroundColor: '#fff',
      marginHorizontal: Dimensions.get('window').width*0.05,
      borderRadius: 25,
      elevation: 6,
      marginBottom: 15,
      position: 'relative',
      marginVertical: Dimensions.get('window').height*0.01,
      paddingVertical: Dimensions.get('window').height*0.01
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
      color: "#000",
      fontSize: Dimensions.get('window').width*0.05,
      fontWeight: 'bold',
    },
    desc: {
      fontSize: Dimensions.get('window').width*0.037,
      marginTop: Dimensions.get('window').width*0.01,
      color: '#000'
    }
    
  });