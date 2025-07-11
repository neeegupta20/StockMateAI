def add_labels(df,durations=[66,188,345]):
    for d in durations:
        df[f'Future_Return_{d}']=df['Close'].shift(-d)/df['Close']-1
        df[f'Target_{d}']=df[f'Future_Return_{d}'].apply(lambda x:1 if x>0 else 0)
    
    df.dropna(inplace=True)
    return df