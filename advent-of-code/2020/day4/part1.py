import re

with open('input.txt') as f:
    passports = [l.replace('\n', '') for l in f.read().split('\n\n')]

valid = 0

for passport in passports:
    fields = re.findall(r'(\w+):[\w\d]+', passport)

    for field in fields:

