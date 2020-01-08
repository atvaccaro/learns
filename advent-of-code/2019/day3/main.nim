
import sequtils
import strutils
import system

type point* = tuple[x: int, y: int]
type instruction* = tuple[dir: char, dist: int]

proc parseInstruction*(s: string): instruction =
  result = (dir: s[0], dist: parseInt(s[1..len(s)-1]))

proc runInstruction*(start: point, i: instruction): seq[point] =
  var p = start

  for _ in 1..i.dist:
    case i.dir
    of 'R':
      p.x = p.x + 1
    of 'L':
      p.x = p.x - 1
    of 'U':
      p.y = p.y + 1
    of 'D':
      p.y = p.y - 1
    else: discard

    result.add(p)


let f = open("input.txt")
let instructions1 = map(f.readLine().split(','), parseInstruction)
let instructions2 = map(f.readLine().split(','), parseInstruction)

var wire1: seq[point] = @[(0, 0)]
var wire2: seq[point] = @[(0, 0)]

for ins in instructions1:
  wire1 = concat(wire1, runInstruction(wire1[len(wire1)-1], ins))

for ins in instructions2:
  wire2 = concat(wire2, runInstruction(wire2[len(wire2)-1], ins))

echo "Wire 1: ", len(wire1)
echo "Wire 2: ", len(wire2)

var intersections: seq[point]

for point1 in wire1:
  for point2 in wire2:
    if point1 == point2:
      intersections.add(point1)

echo intersections

var closest = abs(intersections[1].x) + abs(intersections[1].y)
for p in intersections[2..len(intersections)-1]:
  let dist = abs(p.x) + abs(p.y)
  if dist < closest:
    closest = dist

echo "Part 1: ", closest

var intersections2: seq[tuple[d: int, p: point]]

for i, point1 in wire1:
  for j, point2 in wire2:
    if point1 == point2:
      intersections2.add((i+j, point1))

echo intersections2

closest = intersections2[1].d
for p in intersections2[2..len(intersections)-1]:
  if p.d < closest:
    closest = p.d

echo "Part 2: ", closest
