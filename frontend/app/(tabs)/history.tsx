import { Image } from 'expo-image';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>

    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1A141F"
  }
});
