from prefect import task, Task, Flow, Parameter


@task
def say_hello():
    print("Hello, world!")


@task
def add(x, y=1):
    return x + y


@task
def say_hello(person: str) -> None:
    print("Hello, {}!".format(person))


class AddTask(Task):

    def __init__(self, default: int, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.default = default

    def run(self, x: int, y: int = None) -> int:
        if y is None:
            y = self.default
        return x + y


# initialize the task instance
addtask = AddTask(default=1)

if __name__ == '__main__':
    with Flow("My first flow!") as flow:
        first_result = add(1, y=2)
        second_result = add(x=first_result, y=100)

    state = flow.run()

    assert state.is_successful()

    first_task_state = state.result[first_result]
    assert first_task_state.is_successful()
    assert first_task_state.result == 3

    second_task_state = state.result[second_result]
    assert second_task_state.is_successful()
    assert second_task_state.result == 103

    print(first_task_state, second_task_state)

    # with Flow("Say hi!") as flow:
    #     name = Parameter("name")
    #     say_hello(name)
    #
    # flow.run(name="Marvin")
