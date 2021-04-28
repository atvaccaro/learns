import re

valid = 0
with open('input.txt') as f:
    for line in f.readlines():
        i, j, l, password = re.match(r'(\d+)-(\d+) (\w): (\w+)', line).groups()
        if (password[int(i)-1], password[int(j)-1]).count(l) == 1:
            valid += 1
print(valid)
