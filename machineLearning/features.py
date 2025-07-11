def add_features(df):
    try:
        df['Return_1']=df['Close'].pct_change(1)
        df['Return_5']=df['Close'].pct_change(5)
        df['Volatility_5']=df['Close'].pct_change().rolling(window=5).std()

        df['Close_to_EMA20']=(df['Close']-df['EMA_20'])/df['EMA_20']
        df['Close_to_EMA50']=(df['Close']-df['EMA_50'])/df['EMA_50']

        df.dropna(inplace=True)
        return df

    except Exception as e:
        print(f"[ERROR] Feature engineering failed: {e}")
        return df