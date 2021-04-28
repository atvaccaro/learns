import re

valid = 0
with open('input.txt') as f:
    for line in f.readlines():
        lmin, lmax, l, password = re.match(r'(\d+)-(\d+) (\w): (\w+)', line).groups()
        if int(lmin) <= password.count(l) <= int(lmax):
            valid += 1
print(valid)
