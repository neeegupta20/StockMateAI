import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

export default function RootLayout(){

  const [showSplashScreen, setShowSplashScreen]=useState(true);
  const videoSource=require('../assets/videos/stockmate-intro.mp4');
  
  const player=useVideoPlayer(videoSource,(player)=>{
    player.loop=false;
    player.play();
  });

  useEffect(()=>{
    setTimeout(()=>{
      setShowSplashScreen(false);
    },8100); 
  },[player]);

  if(showSplashScreen){
    return(
      <View style={styles.videoContainer}>
        <VideoView player={player} style={styles.fullscreen}/>
      </View>
    );
  }

  return(
    <Stack>
      <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
    </Stack>
  );
}

const styles=StyleSheet.create({
  videoContainer:{
    flex:1,
    backgroundColor:'#11001C',
  },
  fullscreen:{
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
});