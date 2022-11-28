import { View, Text, ScrollView, Image, useWindowDimensions } from "react-native";
import React from "react";
import styles from "../pages/styles";

export default function Banner({banner}) {
    const {height,width} = useWindowDimensions();
  return (
    <View style={styles.banner}>
        <Image source={banner} 
            style={{...styles.bannerImg, height: height * 0.22, width: width * 0.89, marginHorizontal: width * 0.005}}  
            resizeMode="cover"/>
        <View style={styles.bannerText}>
            <Text style={styles.heading}>Monday Special</Text>
            <Text style={styles.para}>Get up to 10% mondays only</Text>
        </View>
    </View>
  );
}
