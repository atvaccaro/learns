import operator

direction_lines = open('input.txt').readlines()

moves = {
    'U': (-1, 0),
    'R': (0, 1),
    'D': (1, 0),
    'L': (0, -1),
}


def run_on_numpad(numpad):
    def get_num(tup):
        if not (0 <= tup[0] and 0 <= tup[1]) or numpad[tup[0]][tup[1]] < 0:
            raise IndexError
        return numpad[tup[0]][tup[1]]

    location = (1, 1)
    passcode = ''
    for directions in direction_lines:
        for direction in directions.strip():
            try:
                get_num(tuple(map(operator.add, location, moves[direction])))
                location = tuple(map(operator.add, location, moves[direction]))
            except IndexError:
                continue
        passcode += str(get_num(location))
    return passcode

# Part 1
numpad = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
print 'Part 1: ' + run_on_numpad(numpad)

# Part 2
numpad = [
    [-1, -1, 1, -1, -1],
    [-1, 2, 3, 4, -1],
    [5, 6, 7, 8, 9],
    [-1, 'A', 'B', 'C', -1],
    [-1, -1, 'D', -1, -1]
]
print 'Part 2: ' + run_on_numpad(numpad)

