# importing the pandas library
import pandas as pd
  
# reading the csv file
df = pd.read_csv(r"C:\Users\admin\OneDrive\Projects\statistical-analysis-tool\sample_data\california_housing.csv")
  
# updating the column value/data
df.drop('ocean_proximity', axis=1, inplace=True)
  
# writing into the file
df.to_csv(r"C:\Users\admin\OneDrive\Projects\statistical-analysis-tool\sample_data\california_housing.csv", index=False)
  
