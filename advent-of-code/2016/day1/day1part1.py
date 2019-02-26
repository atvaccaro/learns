directions = open('input.txt').read().replace(' ', '').split(',')
compass = ('N', 'E', 'S', 'W')
location = [0, 0, 0, 0] # N=0, E=1, S=2, W=3
current_direction = 0
for direction in directions:
    current_direction = (current_direction + {'L': -1, 'R': 1}[direction[0]]) % 4
    location[current_direction] += int(direction[1:])
print abs(location[0] - location[2]) + abs(location[1] - location[3])
