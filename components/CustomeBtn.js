import { View, Text, Pressable } from "react-native";
import React from "react";
import styles from "../pages/styles";

export default function CustomeBtn({name, onPress}) {
  return (
    <View style={styles.imgContainer}>
        <Pressable onPress={onPress} style={styles.customeBtn}>
        <Text style={styles.customeBtnText}>{name}</Text>
        </Pressable>
    </View>
  );
}
