class Present(object):
    def __init__(self, present):
        self.length = int(present[0])
        self.width = int(present[1])
        self.height = int(present[2])
        self.sides = sorted([self.length, self.width, self.height])

    def getSA(self):
        return 2*(self.length*self.width) + 2*(self.width*self.height) + 2*(self.height*self.length) + min(self.length*self.width, self.width*self.height, self.height*self.length)

    def getRibbon(self):
        return 2*self.sides[0] + 2*self.sides[1] + reduce(lambda x, y : x * y, self.sides)

paper = 0
ribbon = 0
with open('day_2_input.txt') as f:
    presents = f.read().split()
    for present in presents:
        p = Present(present.rsplit('x'))
        paper += p.getSA()
        ribbon += p.getRibbon()
print paper
print ribbon
