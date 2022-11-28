import { View, Text, ScrollView, Pressable, useWindowDimensions } from "react-native";
import React, {useState} from "react";
import styles from "../pages/styles";

export default function Filter() {
    const categories = ['recent', 'History',];
    const {height,width} = useWindowDimensions();
    const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={{width: width,justifyContent:'center'}}>
    <View 
    style={{width: width, justifyContent:'center', flexDirection: 'row'}} 
    horizontal 
    showsHorizontalScrollIndicator={false}>
          {
              categories.map((item, index)=>{
                  return <Pressable 
                              onPress={()=>{setSelectedIndex(index)}}
                              style={[styles.catBtn,
                                  selectedIndex===index ?
                                      styles.catBtnSelected : styles.catBtnUnselected]} 
                              key={index}>
                              <Text style={[styles.catPara,selectedIndex===index ? 
                                      styles.catParaSelected : styles.catParaUnselected]}>{item}</Text>
                  </Pressable>
              })
          }
    </View>
  </View>
  )
}