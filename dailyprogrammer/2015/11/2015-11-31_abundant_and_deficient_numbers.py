n = input()
divs = []
for i in range(1, n+1):
    if n%i==0:
        divs.append(i)
sum_divs = reduce(lambda x, y: x + y, divs)
if sum_divs > 2*n:
    print '%d abundant by %d' %(n, sum_divs - 2*n)
elif sum_divs < 2*n:
    print '%d deficient' %n
else:
    print '%d --neither-- deficient' %n
