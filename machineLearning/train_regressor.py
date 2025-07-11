from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import root_mean_squared_error, r2_score
from sklearn.model_selection import train_test_split
import pandas as pd
import joblib

durations=[66,188,345]
combined_df=pd.read_csv("machineLearning/combined_df_with_features.csv")
features=['RSI_14','MACD_diff','EMA_20', 'EMA_50','Volume_SMA_5','Close','Return_1','Return_5','Volatility_5','Close_to_EMA20','Close_to_EMA50']

for d in durations:
    print(f"\n Training Regressor for {d}-Days Future Return")

    X=combined_df[features]
    y=combined_df[f'Future_Return_{d}']

    reg_data=pd.concat([X,y],axis=1).dropna()
    X_clean=reg_data[features]
    y_clean=reg_data[f'Future_Return_{d}']

    X_train,X_test,y_train,y_test=train_test_split(X_clean,y_clean,test_size=0.2,random_state=42)

    rf_reg=RandomForestRegressor(n_estimators=100,random_state=42)
    rf_reg.fit(X_train,y_train)

    y_pred=rf_reg.predict(X_test)

    print(f" RMSE:{root_mean_squared_error(y_test, y_pred):.4f}")
    print(f" R² Score:{r2_score(y_test, y_pred):.4f}")

    model_path=f"machineLearning/models/regressor_{d}.pkl"
    joblib.dump(rf_reg,model_path)
    print(f"[SAVED] MODEL:{model_path}")