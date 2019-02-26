lights = [[0 for x in range(1000)] for x in range(1000)]
instructions = open('day_6_input.txt').read().splitlines()
for instruction in instructions:
    elements = instruction.replace(',', ' ').split()
    if elements[0] == 'toggle':
        x1 = int(elements[1])
        y1 = int(elements[2])
        x2 = int(elements[4])
        y2 = int(elements[5])
    else:
        x1 = int(elements[2])
        y1 = int(elements[3])
        x2 = int(elements[5])
        y2 = int(elements[6])
    for x in range(x1, x2+1):
        for y in range(y1, y2+1):
            if elements[0] == 'toggle':
                lights[x][y] = lights[x][y] + 2
            elif elements[1] == 'on':
                lights[x][y] = lights[x][y] + 1
            elif elements[1] == 'off':
                lights[x][y] = lights[x][y]-1 if lights[x][y] > 0 else 0
print sum([sum(x) for x in lights])
