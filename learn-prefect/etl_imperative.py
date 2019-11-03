from prefect import Flow

from etl import extract, transform, load

flow = Flow('ETL')
flow.set_dependencies(transform, keyword_tasks=dict(data=extract))
flow.set_dependencies(load, keyword_tasks=dict(data=transform))

flow.run()  # prints "Here's your data: [10, 20, 30]"
