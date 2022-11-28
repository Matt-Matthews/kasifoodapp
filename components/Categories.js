import { View, Text, ScrollView, Pressable, useWindowDimensions } from "react-native";
import React, {useState} from "react";
import styles from "../pages/styles";

export default function Categories({filter}) {
    const categories = ['All', 'Burgers', 'Fast food', 'Cakes', 'Meat', 'Vegetables'];
    const {height,width} = useWindowDimensions();
    const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <View style={{width: width * 0.9}}>
      <ScrollView 
      style={{width: width * 0.9}} 
      horizontal 
      showsHorizontalScrollIndicator={false}>
            {
                categories.map((item, index)=>{
                    return <Pressable 
                                onPress={()=>{setSelectedIndex(index);filter(item)}}
                                style={[styles.catBtn,
                                    selectedIndex===index ?
                                        styles.catBtnSelected : styles.catBtnUnselected]} 
                                key={index}>
                                <Text style={[styles.catPara,selectedIndex===index ? 
                                        styles.catParaSelected : styles.catParaUnselected]}>{item}</Text>
                    </Pressable>
                })
            }
      </ScrollView>
    </View>
  );
}
