import os
import pandas as pd

all_data=[]

data_dir="machineLearning/data"
for filename in os.listdir(data_dir):
    if filename.endswith(".csv"):
        ticker=filename.replace(".csv","")
        df=pd.read_csv(os.path.join(data_dir,filename),parse_dates=['Date'])
        df['Ticker']=ticker
        all_data.append(df)

combined_df=pd.concat(all_data,ignore_index=True)
output_path="machineLearning/combined_df_with_features.csv"
combined_df.to_csv(output_path,index=False)