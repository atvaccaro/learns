directions = open('input.txt').read().replace(' ', '').split(',')
compass = ('N', 'E', 'S', 'W')
location = [0, 0]
history = []
current_direction = 0
for direction in directions:
    current_direction = (current_direction + {'L': -1, 'R': 1}[direction[0]]) % 4
    for step in range(int(direction[1:])):
        if current_direction > 1:
            location[current_direction % 2] -= 1
        else:
            location[current_direction % 2] += 1
        if tuple(location) in history:
            print abs(location[0]) + abs(location[1])
            exit(0)
        history.append(tuple(location))

