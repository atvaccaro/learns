def is_nice(word):
    pairs = [(i, word[i], word[i+1]) for i in range(len(word)-1)]
    triples = [word[i] == word[i+1] == word[i+2] for i in range(len(word)-2)]
    double_pair = len(set(pairs)) + sum(triples) < len(pairs)
    repeat = any([word[x]==word[x+2] for x in range(len(word)-2)])
    return double_pair and repeat
print sum([is_nice(w) for w in open('day_5_input.txt').read().split()])
