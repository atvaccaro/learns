moves, houses, x, y = {'<':(-1, 0), '>':(1, 0), '^':(0, 1), 'v':(0, -1)}, {}, [0, 0], [0, 0]
for i, move in enumerate(open('day_3_input.txt').read()):
    x[i%2], y[i%2] = x[i%2] + moves[move][0], y[i%2] + moves[move][1]
    houses.update({(x[i%2], y[i%2]): houses.get((x[i%2], y[i%2]), 0)+1})
print len(houses)
