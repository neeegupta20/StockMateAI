import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report,confusion_matrix
import joblib

df=pd.read_csv("machineLearning/combined_df_with_features.csv") 
features=['RSI_14','MACD_diff','EMA_20', 'EMA_50','Volume_SMA_5','Close','Return_1','Return_5','Volatility_5','Close_to_EMA20','Close_to_EMA50']

durations=[66,188,345]

for d in durations:
    print(f"\n TRAINING CLASSIFIER for Target_{d}:\n"+"-"*40)
    
    X=df[features]
    y=df[f'Target_{d}']
    
    data=pd.concat([X, y],axis=1).dropna()
    X_clean=data[features]
    y_clean=data[f'Target_{d}']
    
    X_train, X_test, y_train, y_test=train_test_split(X_clean,y_clean,test_size=0.2,random_state=42,stratify=y_clean)
    
    clf=RandomForestClassifier(n_estimators=100,random_state=42)
    clf.fit(X_train,y_train)

    y_pred=clf.predict(X_test)
    
    print(confusion_matrix(y_test, y_pred))
    print(classification_report(y_test,y_pred))

    model_path=f"machineLearning/models/classifier_{d}.pkl"
    joblib.dump(clf,model_path)
    print(f"[SAVED] MODEL:{model_path}")
