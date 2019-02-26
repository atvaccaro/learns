def is_nice(word):
    vowels = len([x for x in word if x in 'aeiou']) >= 3
    doubles = any([word[x]==word[x+1] for x in range(len(word)-1)])
    strings = all([x not in word for x in ['ab', 'cd', 'pq', 'xy']])
    return vowels and doubles and strings
print sum([is_nice(word) for word in open('day_5_input.txt').read().split()])
