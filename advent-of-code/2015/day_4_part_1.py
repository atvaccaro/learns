import hashlib
key = 'yzbqklnj'
n = 1
while True:
    md5 = hashlib.md5('%s%d' %(key, n)).hexdigest()
    if all(map(lambda x: x=='0', md5[0:5])):
        print n
        break
    n += 1
