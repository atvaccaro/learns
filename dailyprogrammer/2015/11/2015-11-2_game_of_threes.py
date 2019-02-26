#challenge for 11/2/15

number = input()
while number > 1:
    #you can also do this really cool thing; discrete math whoo!
    #op = (0, -1, 1)[int(num % 3)]
    #number = (number + op) / 3

    print number,
    if number%3==0:
        number /= 3
        print 0
    elif (number+1)%3==0:
        number = (number + 1) / 3
        print '+1'
    else:
        number = (number - 1) / 3
        print '-1'
