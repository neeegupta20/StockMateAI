import ta

def add_indicators(df):
    try:
        df['RSI_14']=ta.momentum.RSIIndicator(close=df['Close'],window=14).rsi()

        macd=ta.trend.MACD(close=df['Close'])
        df['MACD_diff']=macd.macd_diff()

        df['EMA_20']=ta.trend.EMAIndicator(close=df['Close'],window=20).ema_indicator()
        df['EMA_50']=ta.trend.EMAIndicator(close=df['Close'],window=50).ema_indicator()

        df['Volume_SMA_5']=df['Volume'].rolling(window=5).mean()
        
        df.dropna(inplace=True)

        return df
    
    except Exception as e:
        print(f"[ERROR] Adding Indicators FAILED:{e}")
        return df
