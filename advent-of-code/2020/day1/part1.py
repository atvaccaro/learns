import itertools

with open('input.txt') as f:
    numbers = [int(n) for n in f.readlines()]

for a, b in itertools.combinations(numbers, 2):
    if a + b == 2020:
        print(a * b)