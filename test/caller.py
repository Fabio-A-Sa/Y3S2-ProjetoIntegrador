import subprocess

# list of input_time values
input_times = [
    "2023-03-27T14:00:00",
    "2023-03-29T09:00:00",
    "2023-03-29T14:00:00"
]

# loop over the input_time values and call the first program for each value
for input_time in input_times:
    cmd = f"python3 'filter_data.py' {input_time}"
    subprocess.run(cmd, shell=True)
