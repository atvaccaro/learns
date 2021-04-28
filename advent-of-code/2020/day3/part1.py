from rich.traceback import install

install(show_locals=True)

with open('input.txt') as f:
    grid = [list(s.strip()) for s in f.readlines()]

trees = 0
i = 0
j = 0

while i+1 < len(grid):
    i += 1
    j += 3

    if j >= len(grid[0]):
        j -= len(grid[0])

    if grid[i][j] == '#':
        trees += 1

print(trees)
