import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFonts, Michroma_400Regular } from '@expo-google-fonts/michroma';
import LottieView from 'lottie-react-native';
import loaderWhite from "../../assets/loaderWhite.json"
import chatBot from "../../assets/aibot.json"
import { router } from 'expo-router';

export default function HomeScreen(){
  const [fontsLoaded]=useFonts({
    Michroma_400Regular
  })

  if(!fontsLoaded){
    return(
      <SafeAreaView style={styles.container}>
        <LottieView source={loaderWhite} autoPlay loop style={styles.loaderIcon}/>
      </SafeAreaView>
    )
  }
  return(
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image style={styles.image} source={require('/Users/nee.gupta20/Documents/StockMateAI/frontend/assets/images/StockMateBot.png')}></Image>
        <Text style={styles.greeting}>
          StockMateAI
        </Text>
        <Text style={styles.tagline}>Your AI Stock Assistant</Text>
        <View style={styles.aboutBox}>
          <Text style={styles.aboutText}>
            StockMateAI is your smart stock market companion trained on 5 years of NIFTY50 data, it analyzes technical indicators and market trends to suggest the best and worst stocks to act on today. Get real-time targets, stop-loss insights, and AI-powered reasoning tailored to your risk profile and goals.
          </Text>
        </View>
        <TouchableOpacity onPress={()=>{router.navigate('/(tabs)/stockmate')}} style={styles.button}>
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>
        <LottieView source={chatBot} autoPlay loop style={styles.animation}></LottieView>
        <Text style={styles.tagline}>StockMateAI 1.0.1 ©</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1A141F"
  },
  scrollContainer:{
    paddingTop:20,
    alignItems:'center',
    paddingBottom:60,
  },
  loaderIcon:{
    width:40,
    height:40,
    alignSelf:"center",
    top:50
  },
  greeting:{
    fontFamily:"Michroma_400Regular",
    color:"#FFFFFF",
    fontSize:40,
    alignSelf:"center",
  },
  image:{
    width:380,
    height:450,
    alignSelf:"center",
    borderRadius:50
  },
  tagline:{
    fontFamily:'Michroma_400Regular',
    fontSize:14,
    color:'#9D9D9D',
    marginTop:4,
    marginBottom:16,
    textAlign:'center',
  },
  animation:{
    height:300,
    width:350,
    marginBottom:200,
    marginTop:30
  },
  aboutBox:{
    marginTop:10,
    paddingHorizontal:20,
    paddingBottom:40
  },
  aboutText:{
    fontSize:20,
    color:'#ADA1BA',
    fontFamily:'Michroma_400Regular',
    textAlign:'center',
    lineHeight:30,
  },
  button:{
    paddingHorizontal:110,
    backgroundColor:"#592693",
    paddingVertical:15,
    marginBottom:20,
    borderRadius:20
  },
  buttonText:{
    color:"#FFFFFF",
    fontSize:25
  },
  versionLine:{
    fontFamily:'Michroma_400Regular',
    fontSize:14,
    color:'#9D9D9D',
    textAlign:'center',
  },
});
