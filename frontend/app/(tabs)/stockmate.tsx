import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function StockMateScreen(){

  const [messages,setMessages]=useState<string[]>([]);
  

  useEffect(()=>{
    const introMessage="Hi!, I'm StockMateAI, your intelligent stock market assistant, I’ve been trained on 5 years of NIFTY50 data to help you make smarter investment decisions.";
    const featureMessage="I can suggest top picks, help you avoid risky stocks, or score a stock you're interested in all backed by data and AI.";

    setTimeout(()=>{
      setMessages([introMessage]);
    }, 1000);

    setTimeout(()=>{
      setMessages([introMessage,featureMessage]);
    }, 3000);
  },[]);

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        {messages.map((msg,index)=>(
          <View key={index} style={styles.messageRow}>
            <Image
              style={styles.chatBotImage}
              source={require('../../assets/images/StockMateBot.png')}
            />
            <View style={styles.messageBubble}>
              <Text style={styles.messageText}>{msg}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#1A141F"
  },
  messageRow:{
    flexDirection:'row',
    alignItems:'flex-end',
    marginTop:20,
    paddingHorizontal:10,
  },
  inner:{
    padding:20,
    alignItems:'center'
  },
  chatBotImage:{
    height:50,
    width:50,
    marginRight:30,
    borderRadius:10
  },
  messageText: {
    color:"#FFFFFF",
    fontSize:18,
    lineHeight:22,
    fontWeight:"500"
  },
  messageBubble: {
    backgroundColor: '#592693',
    padding: 16,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    maxWidth: '80%'
  },
});
