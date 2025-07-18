import * as SecureStore from 'expo-secure-store';

const WATCHLIST_KEY='user_watchlist';

export function useWatchlist(){
  
    const saveWatchlist=async(list:any[])=>{
        await SecureStore.setItemAsync(WATCHLIST_KEY,JSON.stringify(list));
    };

    const getWatchlist=async():Promise<any[]>=>{
        const data=await SecureStore.getItemAsync(WATCHLIST_KEY);
        return data? JSON.parse(data):[];
    };

    const addStock=async(stock:any)=>{
        const list=await getWatchlist();
        const exists=list.some((s:any)=>s.ticker===stock.ticker);
        if(!exists){
            const updated = [...list, stock];
            await saveWatchlist(updated);
        }
    };

    const removeStock=async(ticker:string)=>{
        const list=await getWatchlist();
        const updated=list.filter((s:any)=>s.ticker!==ticker);
        await saveWatchlist(updated);
    };

    const isStarred=async(ticker:string):Promise<boolean>=>{
        const list=await getWatchlist();
        return list.some((s:any)=>s.ticker===ticker);
    };

    return {addStock,removeStock,getWatchlist,isStarred};
}