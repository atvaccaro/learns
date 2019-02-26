plants = []
people = input()
starting_fruits = input()
for i in range(starting_fruits):
    plants.append(0)
week = 1
while True:
    if reduce(lambda x, y: x + y, plants) >= people:
        print week
        break
    plants = map(lambda x: x+1, plants)
    for i in range(reduce(lambda x, y: x + y, plants)):
        plants.append(0)
    week += 1

#better version
fruits = starting_fruits
plants = fruits
week = 1
while fruits < people:
    fruits += plants
    plants += fruits
    week += 1
print week
