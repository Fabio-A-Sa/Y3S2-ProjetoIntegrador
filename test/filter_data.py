import pandas as pd
from datetime import timedelta, datetime, timezone
import sys

# specify the file path
file_path = "./influx_data.csv"

# read the CSV file into a pandas DataFrame
data = pd.read_csv(file_path, header = 0)
data.drop(['result','_field','topic','_measurement'], axis=1, inplace = True)

# convert the _time column to datetime format
data['_time'] = pd.to_datetime(data['_time'])

# specify the maximum value for _value to include a row
max_value = 80

# get input_time from command line argument
input_time = sys.argv[1]

input_time_utc = datetime.fromisoformat(input_time).replace(tzinfo=timezone.utc)
#input_time_utc_starting = input_time_utc - timedelta(minutes=25)
input_time_utc_end = input_time_utc + timedelta(minutes=240)

relevant = data.loc[(data['_time'] > input_time_utc) & (data['_time'] <= input_time_utc_end) & (data['_value'] <= max_value)]

relevant.to_csv('parsed_data_'+input_time+'.csv', index=False)
