import { Tabs } from 'expo-router';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useFonts, Manrope_400Regular, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import { SafeAreaView, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import loaderWhite from "../../assets/loaderWhite.json"

export default function TabLayout() {

  const [fontsLoaded]=useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  })

  if(!fontsLoaded){
    return(
      <SafeAreaView style={styles.container}>
        <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/>
      </SafeAreaView>
    )
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:"#FFFFFF",
        headerShown:false,
        tabBarStyle:{
          backgroundColor:"#362E3D",
          height:90,
          paddingTop:10,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title:'Home',
          tabBarIcon:({ color}) =><Feather name="home" size={30} color={color} />,
          tabBarLabelStyle:{
            fontSize:18,
            paddingTop:8,
            fontFamily:"Manrope_600SemiBold"
          }
        }}
      />
      <Tabs.Screen
        name="stockmate"
        options={{
          title:'StockMate',
          tabBarIcon: ({ color }) => <Foundation name="graph-trend" size={35} color={color} />,
          tabBarLabelStyle:{
            fontSize:18,
            paddingTop:8,
            fontFamily:"Manrope_600SemiBold"
          }
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title:'History',
          tabBarIcon: ({ color }) => <FontAwesome5 name="history" size={28} color={color} />,
          tabBarLabelStyle:{
            fontSize:18,
            paddingTop:8,
            fontFamily:"Manrope_600SemiBold"
          }
        }}
      />
    </Tabs>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1A141F"
  },
  loaderIcon:{
    width: 40,
    height: 40,
    alignSelf:"center",
    top: 30
  }
})
