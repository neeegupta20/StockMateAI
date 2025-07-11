import { Image, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { useFonts, Michroma_400Regular } from '@expo-google-fonts/michroma';
import LottieView from 'lottie-react-native';
import loaderWhite from "../../assets/loaderWhite.json"

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
      <ScrollView>
        <Image style={styles.image} source={require('/Users/nee.gupta20/Documents/StockMateAI/frontend/assets/images/StockMateBot.png')}></Image>
        <Text style={styles.greeting}>
          StockMateAI
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1A141F"
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
    marginVertical:20
  },
  image:{
    width:380,
    height:450,
    alignSelf:"center",
    borderRadius:50
  }
});
