#challenge for 10/9/15
#not sure if this is correct
words = sorted(open('enable1.txt').read().splitlines(), key=lambda x: len(x))
chars = map(lambda x: ''.join(sorted(set(x))), words)
num_keyboards = input()

for i in range(num_keyboards):
    keyboard = ''.join(sorted(set(raw_input())))
    matches = [words[loc] for loc, val in enumerate(chars) if all(c in keyboard for c in val)]
    print matches
