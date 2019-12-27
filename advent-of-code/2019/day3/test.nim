import unittest

import main

suite "Test all the main functions":
  test "splitInstruction works":
    let raw_ins = "R123"
    let expected: instruction = ('R', 123)

    let actual = splitInstruction(raw_ins)

    require(actual == expected)

  test "runInstruction does nothing on a bad direction":
    let start: point = (0, 2)
    let ins: instruction = ('X', 1)
    let expected: seq[point] = @[(0, 2)]

    let actual = runInstruction(start, ins)

    require(actual == expected)

  test "runInstruction works on R1":
    let start: point = (0, 2)
    let ins: instruction = ('R', 1)
    let expected: seq[point] = @[(1, 2)]

    let actual = runInstruction(start, ins)

    require(actual == expected)

  test "runInstruction works on L3":
    let start: point = (40, 2)
    let ins: instruction = ('L', 3)
    let expected: seq[point] = @[(39, 2), (38, 2), (37, 2)]

    let actual = runInstruction(start, ins)

    require(actual == expected)
