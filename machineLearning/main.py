import pandas as pd
import joblib
import numpy as np
import yfinance as yf
import os
import sys
import json

df=pd.read_csv("combined_df_with_features.csv")

user_duration=int(sys.argv[2])
user_risk=sys.argv[1]
user_choice=int(sys.argv[3]);
stock_symbol=sys.argv[4] if user_choice==3 and len(sys.argv)>4 else None

clf=joblib.load(f"machineLearning/models/classifier_{user_duration}.pkl")
reg=joblib.load(f"machineLearning/models/regressor_{user_duration}.pkl")

features=['RSI_14','MACD_diff','EMA_20','EMA_50','Volume_SMA_5','Close','Return_1','Return_5','Volatility_5','Close_to_EMA20','Close_to_EMA50']

df=df.dropna(subset=features+[f'Future_Return_{user_duration}',f'Target_{user_duration}'])

def score_stock(ticker,latest,pred,prob,expected_return,volatility,close_price):
    
    score=0

    score+=prob*25
    score+=min(expected_return,0.30)*100
    er_percent=expected_return*100
    if er_percent>10:
        score+=15
    elif er_percent>5:
        score+=10
    elif er_percent>2:
        score+=7
    else:
        score+=4

    if volatility<0.015:
        score+=13
    elif volatility<0.025:
        score+=7
    
    if pred==1:
        score+=10
    
    if user_risk=="Low":
        if er_percent>15 or volatility>0.025:
            score-=10
    elif user_risk=="Medium":
        if er_percent>25:
            score-=5
    elif user_risk=="High":
        if er_percent>20:
            score+=5

    score=max(0,min(100,round(score,2)))
    return score


results=[]
target_stocks=[stock_symbol] if user_choice==3 and stock_symbol else df['Ticker'].unique()

for ticker in target_stocks:
    stock_df=df[df['Ticker']==ticker].copy()
    if stock_df.empty:
        continue

    latest=stock_df.iloc[-1]
    X=pd.DataFrame([latest[features].values],columns=features)

    pred=clf.predict(X)[0]
    prob=clf.predict_proba(X)[0][1]
    expected_return=reg.predict(X)[0]
    volatility=latest['Volatility_5']
    try:
        full_ticker=ticker+".NS" if not ticker.endswith(".NS") else ticker
        live_data=yf.Ticker(full_ticker).history(period="1d", interval="1d")
        if not live_data.empty:
            close_price=live_data['Close'].iloc[-1]
        else:
            close_price=latest['Close']
    except:
        close_price=latest['Close']

    score=score_stock(
        ticker=ticker,
        latest=latest,
        pred=pred,
        prob=prob,
        expected_return=expected_return,
        volatility=volatility,
        close_price=close_price
    )

    result={
        'ticker': ticker,
        'score': score,
        'target': round(close_price * (1 + expected_return), 2),
        'stop_loss': round(close_price * (1 - volatility * 2), 2),
        'expected_return': round(expected_return * 100, 2),
        'volatility': round(volatility, 4),
        'confidence': round(prob, 2),
        'prediction': "UP" if pred == 1 else "DOWN"
    }

    results.append(result)

if user_choice==1:
    top_stocks=sorted(results, key=lambda x: x['score'],reverse=True)[:3]
    print(json.dumps({"top": top_stocks},indent=2))

elif user_choice==2:
    worst_stocks=sorted(results, key=lambda x:x['score'])[:3]
    print(json.dumps({"worst": worst_stocks},indent=2))

elif user_choice==3:
    print(json.dumps({"single": [results[0]]},indent=2))