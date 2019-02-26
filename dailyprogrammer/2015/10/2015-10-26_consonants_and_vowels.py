#challenge for 10/16/15

import random

consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
    'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z']
vowels = ['a', 'e', 'i', 'o', 'u']

s  = raw_input()
word = []

for char in list(s):
    if char == 'c':
        word.append(random.choice(consonants))
    elif char == 'v':
        word.append(random.choice(vowels))
    else:
        exit(0)
print ''.join(word)
