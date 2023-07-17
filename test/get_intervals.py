import pandas as pd
from datetime import datetime, time, timezone

# specify the file path
file_path = "./influx_data.csv"

# read the CSV file into a pandas DataFrame
data = pd.read_csv(file_path)

# convert the _time column to datetime format
data['_time'] = pd.to_datetime(data['_time'])

# specify the maximum value for _value to include a row
max_value = 70

# initialize variables for counting the continuous values above 70
above_count = 0
below_count = 0
count = 0

# initialize a list to store the filtered rows
filtered_rows = []

# iterate over the rows of the DataFrame
for index, row in data.iterrows():
    if row["_value"] < max_value and ((row["_time"].time() >= time(9,0)) and (row["_time"].time() <= time(12,30)) or (row["_time"].time() >= time(14,30)) and (row["_time"].time() <= time(17,30))):
        count += 1
        above_count = 0
        if count > 5:
            filtered_rows.append(row)
            below_count += 1
    elif below_count > 0 and row["_value"] >= max_value:
        above_count += 1
    if above_count >= 5:
        count = 0
        above_count = 0
        below_count = 0
        new_row = pd.Series([None]*len(data.columns), index=data.columns)
        filtered_rows.append(new_row)

# create a DataFrame from the filtered rows list
filtered_data = pd.DataFrame(filtered_rows)

# generate output file name with timestamp
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
output_file_path = f"./intervals.csv"

# write the filtered data to a CSV file
filtered_data.to_csv(output_file_path, index=False)
