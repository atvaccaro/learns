import sys

from prefect import task, Flow, Parameter


@task
def extract():
    """Get a list of data"""
    return [1, 2, 3]


@task
def transform(data):
    """Multiply the input by 10"""
    if not data:
        data = [1, 2, 3]
    return [i * 10 for i in data]


@task
def load(data, test=False):
    """Print the data to indicate it was received"""
    if test:
        print("TESTING MODE: DID NOT LOAD")
    else:
        print("Here's your data: {}".format(data))


with Flow('ETL') as extract_only:
    e = extract()

@task
def run_extract_only():
    extract_only.run()


with Flow('ETL2') as flow:
    test = Parameter('test', default=False)
    run_extract_only()
    t = transform(data=None)
    l = load(t, test=test)


# flow.visualize()

if 'extract' in sys.argv:
    extract_only.run()
else:
    flow.run(test=True)

