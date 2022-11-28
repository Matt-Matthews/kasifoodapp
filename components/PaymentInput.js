import { View, TextInput } from "react-native";
import React from "react";
import styles from "../pages/styles";

export default function PaymentInput({placeholder, setValue,num}) {
  return (
    <View style={styles.textField}>
      <TextInput placeholder={placeholder} keyboardType={num?'number-pad':'default'} onChange={(text)=>setValue(text)} />
    </View>
  );
}
