"""
vampires.py

Locates vampire numbers given digits n and num fangs m

Learned about itertools.combinations and operator.mul (when using reduce)
"""

import itertools, operator

def check_vampires(fangs, digits):
    product_digits = sorted(str(reduce(operator.mul, fangs, 1)))
    fang_digits = sorted(''.join([str(fang) for fang in fangs]))
    return product_digits == fang_digits

digits = int(raw_input())
num_fangs = int(raw_input())
size_fangs = digits / num_fangs

#run through possibilities
for fangs in itertools.combinations(range(pow(10, size_fangs-1), pow(10, size_fangs)), num_fangs):
    if check_vampires(fangs, digits):
        print '%d = prod ' %reduce(operator.mul, fangs, 1), fangs
