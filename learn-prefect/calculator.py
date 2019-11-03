from prefect import task, Flow, Parameter


def run(flow, **parameters):
    state = flow.run(**parameters)
    terminal_task = list(flow.terminal_tasks())[0]
    return state.result[terminal_task].result


with Flow('Add one') as flow:
    result = Parameter('x') + 1

assert run(flow, x=1) == 2
assert run(flow, x=2) == 3
assert run(flow, x=-100) == -99

with Flow('Add x and y') as flow:
    result = Parameter('x') + Parameter('y')

assert run(flow, x=1, y=1) == 2
assert run(flow, x=40, y=2) == 42
