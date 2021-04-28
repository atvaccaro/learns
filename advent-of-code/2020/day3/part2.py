
with open('input.txt') as f:
    grid = [list(s.strip()) for s in f.readlines()]

total = 1

for di, dj in [(1, 1), (1, 3), (1, 5), (1, 7), (2, 1)]:
    trees = 0
    i = 0
    j = 0

    while i+di < len(grid):
        i += di
        j += dj

        if j >= len(grid[0]):
            j -= len(grid[0])

        if grid[i][j] == '#':
            trees += 1

    total *= trees

print(total)
