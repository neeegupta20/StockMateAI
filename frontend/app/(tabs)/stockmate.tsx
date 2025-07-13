import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

interface Message{
  sender:'bot' | 'user';
  text:string;
}

const nifty50List=[
    "ADANIENT", "ADANIPORTS", "APOLLOHOSP", "ASIANPAINT", "AXISBANK",
    "BAJAJ-AUTO", "BAJFINANCE", "BAJAJFINSV", "BPCL", "BHARTIARTL",
    "BRITANNIA", "CIPLA", "COALINDIA", "DIVISLAB", "DRREDDY",
    "EICHERMOT", "GRASIM", "HCLTECH", "HDFCBANK", "HDFCLIFE",
    "HEROMOTOCO", "HINDALCO", "HINDUNILVR", "ICICIBANK", "ITC",
    "INDUSINDBK", "INFY", "JSWSTEEL", "KOTAKBANK", "LT",
    "M&M", "MARUTI", "NTPC", "NESTLEIND", "ONGC",
    "POWERGRID", "RELIANCE", "SBILIFE", "SBIN", "SUNPHARMA",
    "TCS", "TATACONSUM", "TATAMOTORS", "TATASTEEL", "TECHM",
    "TITAN", "UPL", "ULTRACEMCO", "WIPRO"
]

export default function StockMateScreen(){
  const [messages,setMessages]=useState<Message[]>([]);
  const [step,setStep]=useState<'initial' | 'risk' | 'duration' | 'picker' | 'done'>('initial');
  const [showChoices,setShowChoices]=useState(false);
  const [riskLevel,setRiskLevel]=useState<string | null>(null);
  const [durationValue,setDurationValue]=useState<number | null>(0);
  const [selectedStock, setSelectedStock]=useState<string>(nifty50List[0]);
  const [globalChoiceId,setGlobalChoiceId]=useState(0);
  const [result,SetResult]=useState(null);
  const [isLoading,setLoading]=useState(false);

  const choicesMap:{[key:string]:number}={
    'Top 3 Stock Picks':1,
    'Top 3 Stocks To Avoid':2,
    'Score a NIFTY50 Stock':3
  };

  useEffect(()=>{
    const introMessage="Hi! I'm StockMateAI, your AI stock market assistant. I’ve been trained on 5 years of NIFTY50 Data to assist you to make smarter investment choices.";
    const featureMessage="My Job is to suggest Top 3 Picks, Top 3 Stocks to Avoid, or Score a NIFTY50 stock you're interested in. Let's Begin !";
    const choiceMessage='Pick what you’d want me to assist you with?';

    setTimeout(()=>{
      setMessages([{sender:'bot',text:introMessage}]);
    }, 1000);

    setTimeout(()=>{
      setMessages((prev)=>[...prev,{sender:'bot',text:featureMessage }]);
    },3000);

    setTimeout(()=>{
      setMessages((prev)=>[...prev, {sender:'bot',text:choiceMessage }]);
    }, 5000);

    setTimeout(()=>{
      setShowChoices(true);
    }, 6000);
  }, []);

  const handleChoice=(choice:string)=>{
    const choiceId=choicesMap[choice];
    setGlobalChoiceId(choiceId);
    setMessages((prev)=>[...prev,{sender:'user',text:choice}]);
    setShowChoices(false);

    if(choiceId===1||choiceId===2){
      setTimeout(() => {
        setMessages((prev)=>[...prev,{sender:'bot',text:'Great. What is the Risk Preference you want to proceed with?'}]);
        setShowChoices(true);
        setStep('risk');
      },1200);
    } 
    else{
      setTimeout(()=>{
        setMessages((prev)=>[
          ...prev,
          {sender:'bot',text:'Great ! Choose a NIFTY50 Stock for me to score.'}
        ]);
        setStep('picker')
      },1200);
    }
  };

  const handleRiskSelection=(risk:string)=>{
    setMessages((prev)=>[...prev,{sender:'user',text:risk}]);
    setRiskLevel(risk);
    setShowChoices(false);

    setTimeout(()=>{
      setMessages((prev)=>[
        ...prev,
        { sender: 'bot', text: 'And what is your Preferred Investment Duration?' }
      ]);
      setShowChoices(true);
      setStep('duration');
    },1000);
  };

  const handleStockPick=(stock:string)=>{
    setSelectedStock(stock);
    setMessages((prev)=>[
      ...prev,
      { sender:'user',text:`Score ${stock}`},
    ]);
    setTimeout(()=>{
        setMessages((prev)=>[...prev,{sender:'bot',text:'Great. What is the Risk Preference you want to proceed with?'}]);
        setShowChoices(true);
        setStep('risk');
    },500);
    setTimeout(()=>{
      setShowChoices(true);
      setStep('risk');
    },1000)
  };

  const handleDurationSelection=async(duration:string)=>{
    setMessages((prev)=>[...prev, { sender: 'user', text: duration }]);
    let days = 66;
    if (duration === "Mid Term (188 Days)") days = 188;
    if (duration === "Long Term (345 Days)") days = 345;
    setDurationValue(days);
    setShowChoices(false);
    setStep("done");

    try{
      setLoading(true);
      const res=await axios.post("http://localhost:3000/suggest",{risk:riskLevel,duration:days,choice:globalChoiceId});
      SetResult(res);
    }catch(error){
      console.log(error);
    }
  };

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        {messages.map((msg, index)=>(
          <View key={index} style={[styles.messageRow,msg.sender==='user'?styles.userRow:styles.botRow]}>
            {msg.sender==='bot' && (
              <Image style={styles.chatBotImage} source={require('../../assets/images/StockMateBot.png')}/>
            )}
            {msg.sender==='user' && (
              <FontAwesome name="user-circle" size={40} color="#9D9D9D" style={{marginLeft:10}}/>
            )}
            <View style={[styles.messageBubble,msg.sender==='user' && styles.userBubble]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
          </View>
        ))}

        {showChoices && step === 'initial' && (
          <View style={styles.choicesContainer}>
            {Object.keys(choicesMap).map((choice) => (
              <TouchableOpacity
                key={choice}
                style={styles.choiceButton}
                onPress={() => handleChoice(choice)}
              >
                <Text style={styles.choiceText}>{choice}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {showChoices && step==='risk' && (
          <View style={styles.choicesContainer}>
            {['Low', 'Medium', 'High'].map((risk) => (
              <TouchableOpacity key={risk}style={styles.choiceButton} onPress={() => handleRiskSelection(risk)}>
                <Text style={styles.choiceText}>{risk} Risk</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {showChoices && step==='duration' && (
          <View style={styles.choicesContainer}>
            {['Short Term (66 Days)', 'Mid Term (188 Days)', 'Long Term (345 Days)'].map((duration)=>(
              <TouchableOpacity key={duration} style={styles.choiceButton} onPress={()=>handleDurationSelection(duration)}>
                <Text style={styles.choiceText}>{duration}</Text>
              </TouchableOpacity>
            ))}      
          </View>
        )}

        {step==='picker' && (
          <View style={styles.pickerWrapper}>
            <Text style={{position:"static",paddingTop:20,alignSelf:"center",fontSize:20,fontWeight:"800"}}>
              Pick & Confirm
            </Text>
            <Picker
              selectedValue={selectedStock}
              onValueChange={(itemValue)=>setSelectedStock(itemValue)}
              style={styles.picker}>
              {nifty50List.map((stock)=>(
                <Picker.Item key={stock} label={stock} value={stock} />
              ))}
            </Picker>
            <TouchableOpacity style={styles.confirmButton} onPress={()=>handleStockPick(selectedStock)}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#1A141F'
  },
  inner:{
    padding:20,
    paddingBottom:60
  },
  messageRow:{
    flexDirection:'row',
    marginTop:20,
    alignItems:'flex-start'
  },
  botRow:{
    justifyContent:'flex-start'
  },
  userRow:{
    justifyContent:'flex-start',
    flexDirection:'row-reverse',
  },
  chatBotImage:{
    height:40,
    width:40,
    marginRight:10,
    borderRadius:20
  },
  messageBubble:{
    backgroundColor:'#592693',
    padding:14,
    borderRadius:20,
    borderTopLeftRadius:0,
    maxWidth:'75%'
  },
  userBubble:{
    backgroundColor:'#444054',
    borderTopRightRadius:0,
    borderTopLeftRadius:20
  },
  messageText:{
    color:'#FFFFFF',
    fontSize:16,
    lineHeight:22
  },
  choicesContainer:{
    marginTop:30,
    width:'100%',
    alignItems:'center'
  },
  choiceButton:{
    backgroundColor:'violet',
    paddingVertical:14,
    paddingHorizontal:20,
    borderRadius:30,
    marginVertical:8,
    width:'90%',
    alignItems:'center'
  },
  choiceText:{
    color:'#FFFFFF',
    fontSize:16,
    fontWeight:'600'
  },
  pickerWrapper: {
    width:'100%',
    backgroundColor:'#FDEADD',
    borderRadius:10,
    paddingVertical:-300,
    paddingHorizontal: 10,
    marginTop:20
  },
  picker:{
    height:160,
    fontSize:14,
  },
  confirmButton:{
    backgroundColor:'#854ED9',
    paddingVertical:12,
    paddingHorizontal:20,
    borderRadius:10,
    marginTop:30,
    marginBottom:10,
    alignItems:'center',
  },
  confirmText:{
    color:'#fff',
    fontSize:16,
    fontWeight:'600',
  }
});
