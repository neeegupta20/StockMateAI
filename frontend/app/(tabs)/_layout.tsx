import { Tabs } from 'expo-router';
import React from 'react';
import { HapticTab } from '@/components/HapticTab';
import Feather from '@expo/vector-icons/Feather';
import Foundation from '@expo/vector-icons/Foundation';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:"#FFFFFF",
        headerShown:false,
        tabBarButton:HapticTab,
        tabBarStyle:{
          backgroundColor:"#362E3D",
          height:100,
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
            paddingTop:10
          }
        }}
      />
      <Tabs.Screen
        name="stockmate"
        options={{
          title:'StockMate',
          tabBarIcon: ({ color }) => <Foundation name="graph-trend" size={30} color={color} />,
          tabBarLabelStyle:{
            fontSize:18,
            paddingTop:10
          }
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title:'History',
          tabBarIcon: ({ color }) => <FontAwesome5 name="history" size={30} color={color} />,
          tabBarLabelStyle:{
            fontSize:18,
            paddingTop:10
          }
        }}
      />
    </Tabs>
  );
}
