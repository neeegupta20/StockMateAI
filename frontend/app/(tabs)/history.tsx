import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useWatchlist } from '../../hooks/useWatchlist';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

export default function WatchlistScreen(){
  const [watchlist,setWatchlist]=useState<any[]>([]);
  const {addStock,removeStock,getWatchlist}=useWatchlist();
  const [starredTickers,setStarredTickers]=useState<string[]>([]);
  const isEmpty=watchlist.length===0;

  useEffect(()=>{
    (async()=>{
      const list=await getWatchlist();
      setWatchlist(list);
      setStarredTickers(list.map(item=>item.ticker));
    })();
  },[[],starredTickers]);

  const toggleStar=async(stock:any)=>{
    const isStarredNow=starredTickers.includes(stock.ticker);
    if(isStarredNow){
      await removeStock(stock.ticker);
      setStarredTickers(prev=>prev.filter(s=>s!==stock.ticker));
    }else{
      await addStock(stock);
      setStarredTickers(prev=>[...prev,stock.ticker]);
    }
  };
  const getScoreColor=(score:number)=>{
    if (score<=30) return '#FF3B30'; 
    if (score<=60) return '#FFCC00';
    return '#4CD964';
  };

  return(
    <SafeAreaView style={styles.container}>
      <ScrollView style={{marginTop:25}}>
        {watchlist.map((stock, index)=>(
          <View key={index} style={styles.stockBox}>
            <Text style={{color:'white',fontSize:22,fontWeight:'bold'}}>
              {stock.ticker}
            </Text>
            <TouchableOpacity onPress={()=>toggleStar(stock)} style={styles.starredIcon}>
              <FontAwesome name="star" size={24} color={starredTickers.includes(stock.ticker) ? "#FFD700" : "white"}/>
            </TouchableOpacity>
            <View style={{flexDirection:'row',gap:25,marginTop:15}}>
              <View style={{marginTop:5}}>
                <Text style={styles.metric}>Target: ₹{stock.target.toFixed(2)}</Text>
                <Text style={styles.metric}>Stop Loss: ₹{stock.stop_loss.toFixed(2)}</Text>
                <Text style={styles.metric}>Expected Return: {stock.expected_return.toFixed(2)}%</Text>
                <Text style={styles.metric}>Risk Factor: {stock.volatility}</Text>
                <Text style={styles.metric}>Prediction: {stock.prediction}</Text>
              </View>
              <View>
                <AnimatedCircularProgress 
                  size={120} 
                  width={15} 
                  fill={stock.score}
                  tintColor={getScoreColor(stock.score)}
                  backgroundColor="#444054"
                  duration={1200}>
                  {(fill:any)=>(
                    <Text style={styles.scoreText}>{`${stock.score.toFixed(1)}`}</Text>
                  )}
                </AnimatedCircularProgress>
              </View>
            </View>
          </View>
        ))}

        {isEmpty && (
          <SafeAreaView style={styles.container}>
            <View style={{alignSelf:"center",marginTop:320}}>
              <TouchableOpacity onPress={()=>{router.navigate('/(tabs)/stockmate')}}>
                <Text style={{color:"#808080",fontSize:30}}>
                  Browse Stocks !
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1, 
    backgroundColor:'#1A141F',
  },
  stockBox:{ 
    backgroundColor:'#2E1E48', 
    padding:16,
    borderRadius:12,
    marginVertical:15,
    marginHorizontal:20
  },
  metric:{ 
    color:'#DCDCDC', 
    fontSize:16, 
    marginTop:4 
  },
  scoreText:{
    color:'white',
    fontSize:26,
    fontWeight:'600',
  },
  starredIcon:{
    position:"absolute",
    top:15,
    right:30
  }
});