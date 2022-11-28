import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function CustomeTabBar({ state, navigation}) {
    const [tabIndex, setTabIndex] = React.useState(state.index);

    function tabNavigate(name) {
      
      navigation.navigate({name: name});
  
    }
    React.useEffect(()=>{
      setTabIndex(state.index);
    },[state.index])
    const size = 27;

  return (
    <View style={styles.tabBar}>
        <Pressable onPress={()=>tabNavigate('Home')}>
            <Ionicons name="md-home-sharp" size={size} color={tabIndex===0?"black":"#B3B3B3"} />
        </Pressable>
        <Pressable onPress={()=>tabNavigate('Map')}>
            <Ionicons name="md-location-sharp" size={size} color={tabIndex===1?"black":"#B3B3B3"} />
        </Pressable>
        <Pressable onPress={()=>tabNavigate('Search')} style={styles.search}>
            <Ionicons name="md-search-sharp" size={size} color="white" />
        </Pressable>
        <Pressable onPress={()=>tabNavigate('Orders')}>
            <Ionicons name="md-receipt-sharp" size={size} color={tabIndex===3?"black":"#B3B3B3"} />
        </Pressable>
        <Pressable onPress={()=>tabNavigate('Settings')}>
            <Ionicons name="md-settings-sharp" size={size} color={tabIndex===4?"black":"#B3B3B3"} />
        </Pressable>
      
    </View>
  )
}

const styles = StyleSheet.create({
    tabBar:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 6,
    },
    search:{
        backgroundColor: '#000',
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 12,
        borderRadius: 7,
    }
});