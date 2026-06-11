import pandas as pd

df = pd.read_csv(
    "output/asl_features.csv"
)

print(df["label"].value_counts())