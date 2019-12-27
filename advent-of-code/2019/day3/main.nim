
import sequtils
import strutils
import system

type point* = tuple[x: int, y: int]
type instruction* = tuple[dir: char, dist: int]

proc splitInstruction*(s: string): instruction =
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
let wire1 = f.readLine().split(',')
let wire2 = f.readLine().split(',')
