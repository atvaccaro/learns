from functools import lru_cache


def fib(n):
    if n == 0:
        return 0
    elif n < 3:
        return 1
    return fib(n - 1) + fib(n - 2)


@lru_cache(maxsize=None)
def fib_with_cache(n):
    if n == 0:
        return 0
    elif n < 3:
        return 1
    return fib_with_cache(n - 1) + fib_with_cache(n - 2)
