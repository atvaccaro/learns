import nimporter
from time import perf_counter
import nmath  # Nim imports!
import pmath


def main():
    print('Measuring Python without cache...')
    start_py = perf_counter()
    for i in range(0, 40):
        print(pmath.fib(i))
    end_py = perf_counter()

    print('Measuring Python with cache...')
    start_py_cached = perf_counter()
    for i in range(0, 40):
        print(pmath.fib_with_cache(i))
    end_py_cached = perf_counter()

    print('Measuring Nim...')
    start_nim = perf_counter()
    for i in range(0, 40):
        print(nmath.fib(i))
    end_nim = perf_counter()

    print('---------')
    print('Python Elapsed: {:.2f}'.format(end_py - start_py))
    print('Python (Cached) Elapsed: {:.2f}'.format(end_py_cached - start_py_cached))
    print('Nim Elapsed: {:.2f}'.format(end_nim - start_nim))


if __name__ == '__main__':
    main()
