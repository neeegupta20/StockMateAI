import yfinance as yf
import pandas as pd
import os
from .indicators import add_indicators
from .features import add_features
from .label_data import add_labels

def fetch_data_stock(ticker):
    print(f"[INFO] Fetching {ticker}...")
    data=yf.Ticker(ticker).history(start="2020-01-01",end="2025-12-31",interval="1d")
    if data.empty:
        print(f"[WARN] No data for {ticker}")
        return None
    data.dropna(inplace=True)
    data.index.name = "Date"
    return data
    
nifty50_tickers=[
    "ADANIENT.NS", "ADANIPORTS.NS", "APOLLOHOSP.NS", "ASIANPAINT.NS", "AXISBANK.NS",
    "BAJAJ-AUTO.NS", "BAJFINANCE.NS", "BAJAJFINSV.NS", "BPCL.NS", "BHARTIARTL.NS",
    "BRITANNIA.NS", "CIPLA.NS", "COALINDIA.NS", "DIVISLAB.NS", "DRREDDY.NS",
    "EICHERMOT.NS", "GRASIM.NS", "HCLTECH.NS", "HDFCBANK.NS", "HDFCLIFE.NS",
    "HEROMOTOCO.NS", "HINDALCO.NS", "HINDUNILVR.NS", "ICICIBANK.NS", "ITC.NS",
    "INDUSINDBK.NS", "INFY.NS", "JSWSTEEL.NS", "KOTAKBANK.NS", "LT.NS",
    "M&M.NS", "MARUTI.NS", "NTPC.NS", "NESTLEIND.NS", "ONGC.NS",
    "POWERGRID.NS", "RELIANCE.NS", "SBILIFE.NS", "SBIN.NS", "SUNPHARMA.NS",
    "TCS.NS", "TATACONSUM.NS", "TATAMOTORS.NS", "TATASTEEL.NS", "TECHM.NS",
    "TITAN.NS", "UPL.NS", "ULTRACEMCO.NS", "WIPRO.NS"
]

os.makedirs("machineLearning/data", exist_ok=True)
for f in os.listdir("machineLearning/data"):
    os.remove(os.path.join("machineLearning/data",f))

for ticker in nifty50_tickers:
    df=fetch_data_stock(ticker)
    if df is not None:
        df=add_indicators(df)
        df=add_features(df)
        df=add_labels(df)
        df.to_csv(f"machineLearning/data/{ticker.replace('.NS','')}.csv")