import itertools

with open('input.txt') as f:
    numbers = [int(n) for n in f.readlines()]

for a, b, c in itertools.combinations(numbers, 3):
    if a + b + c == 2020:
        print(a * b * c)