import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

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
          tabBarIcon:({ color}) => <IconSymbol size={42} name="house.fill" color={color}/>,
          tabBarLabelStyle:{
            fontSize:16,
            paddingTop:12
          }
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title:'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={42} name="paperplane.fill" color={color} />,
          tabBarLabelStyle:{
            fontSize:16,
            paddingTop:12
          }
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title:'History',
          tabBarIcon: ({ color }) => <IconSymbol size={42} name="paperplane.fill" color={color} />,
          tabBarLabelStyle:{
            fontSize:16,
            paddingTop:12
          }
        }}
      />
    </Tabs>
  );
}
