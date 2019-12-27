from prefect import Flow, Parameter, task


@task
def a(x):
    print(f'a: {x}')


@task
def b(x):
    print(f'b: {x}')


@task
def c(x):
    print(f'c: {x}')


with Flow('my-flow') as flow:
    x = Parameter('x')
    a.set_dependencies(downstream_tasks=[b], keyword_tasks={'x': x})
    b.set_dependencies(downstream_tasks=[c], keyword_tasks={'x': x})
    c.set_dependencies(keyword_tasks={'x': x})
    # b.set_dependencies(downstream_tasks=[C], keyword_tasks={"x": param})
    # c.set_dependencies(keyword_tasks={"x": param})

flow.run(x=1)
