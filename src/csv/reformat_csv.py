import sys
import os

year = "2016"

dir = "/homes/iws/jorycw/A3-Template/src/csv/"

csv = dir + "time_type_" + year + ".csv"
out = dir + year + "_r.csv"


output = []


first_line = True

with open(csv, "r") as f:
    for line in f:
        info = line.split(",")
        if first_line:
            info[0] = 'date'
            first_line = False
        if info[0] == '\"Total\"':
            break

        time = info[0].split("-")

        t_split = time[0].split(':')
        if len(t_split) > 1:
            time[0] = time[0][1:]
            t_split = time[0].split(':')

            if len(t_split[0]) == 1:
                t_split[0] = "0" + t_split[0]

            time[0] = t_split[0] + ':' + t_split[1]

            if time[0] == '00:00am':
                time[0] = "12:00am"

            if time[0][5] is 'a':
                time[0] = time[0][:5] + 'AM'
            else:
                time[0] = time[0][:5] + 'PM'
        output.append(time[0] + "," + info[1] + "," + info[2] + "," + info[3] + "," + info[4])

f.close()



with open(out, "w") as f:
    for l in output:
        f.write(l)

f.close()