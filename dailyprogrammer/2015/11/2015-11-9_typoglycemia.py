#challenge for 11/9/2015
import random

sentence = raw_input()
words = sentence.split()
for word in words:
    l = list(word)[1:-1]
    random.shuffle(l)
    word = word[0] + ''.join(l) + word[-1]
    print word
