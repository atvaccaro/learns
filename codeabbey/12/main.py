import sys
from operator import mul

stdin = iter(sys.stdin)
next(stdin)

multipliers = [24*60**2, 60**2, 60, 1]
out = []

for line in stdin:
    l = [int(s) for s in line.rstrip().split()]
    convert = lambda l: sum(map(mul, l, multipliers))
    diff = convert(l[4:]) - convert(l[:4])
    tup = ()
    
    for m in multipliers:
        tup += (diff // m,)
        diff %= m
        
    s = ' '.join(map(str, tup))
    out.append(f'({s})')

print(' '.join(out))