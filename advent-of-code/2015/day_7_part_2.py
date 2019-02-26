'''
Example commands:
123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i
'''
wires = {}
instructions = open('day_7_input_part_2.txt').read().splitlines()

def doNot(elements):
    key = elements[3]
    a = wires[elements[1]]
    a = int(elements[1]) if elements[1].isdigit() else wires[elements[1]]
    # wires.update({elements[3]: ~wires[elements[1]]})
    wires.update({key : ~a})

def doAnd(elements):
    key = elements[4]
    a = int(elements[0]) if elements[0].isdigit() else wires[elements[0]]
    b = int(elements[2]) if elements[2].isdigit() else wires[elements[2]]
    # wires.update({elements[4]: wires[elements[0]] & wires[elements[2]]})
    wires.update({key : a & b})

def doOr(elements):
    key = elements[4]
    a = int(elements[0]) if elements[0].isdigit() else wires[elements[0]]
    b = int(elements[2]) if elements[2].isdigit() else wires[elements[2]]
    # wires.update({elements[4]: wires[elements[0]] | wires[elements[2]]})
    wires.update({key : a | b})

def doLShift(elements):
    key = elements[4]
    a = int(elements[0]) if elements[0].isdigit() else wires[elements[0]]
    b = int(elements[2]) if elements[2].isdigit() else wires[elements[2]]
    # wires.update({elements[4]: wires[elements[0]] << int(elements[2])})
    wires.update({key : a << b})

def doRShift(elements):
    key = elements[4]
    a = int(elements[0]) if elements[0].isdigit() else wires[elements[0]]
    b = int(elements[2]) if elements[2].isdigit() else wires[elements[2]]
    # wires.update({elements[4]: wires[elements[0]] >> int(elements[2])})
    wires.update({key : a >> b})

def doAssign(elements):
    key = elements[2]
    a = int(elements[0]) if elements[0].isdigit() else wires[elements[0]]
    wires.update({key : a})

for instruction in instructions:
    try:
        elements = instruction.split()
        if elements[0] == 'NOT':
            doNot(elements)
        elif elements[1] == 'AND':
            doAnd(elements)
        elif elements[1] == 'OR':
            doOr(elements)
        elif elements[1] == 'LSHIFT':
            doLShift(elements)
        elif elements[1] == 'RSHIFT':
            doRShift(elements)
        else:
            doAssign(elements)
    except KeyError as e:
        instructions.append(instruction)
print wires['a']
