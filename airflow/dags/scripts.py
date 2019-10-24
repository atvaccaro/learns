from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from datetime import datetime, timedelta
from pprint import pprint

default_args = {
    'owner': 'airflow',
    'depends_on_past': False,
    'start_date': datetime(2015, 6, 1),
    'email': ['airflow@example.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
    # 'queue': 'bash_queue',
    # 'pool': 'backfill',
    # 'priority_weight': 10,
    # 'end_date': datetime(2016, 1, 1),
}

dag = DAG('scripts', default_args=default_args, schedule_interval=timedelta(days=1))


def print_thing(thing, **kwargs):
    print(f'{kwargs.get("ds")}: {thing}')
    pprint(kwargs)


def print_five():
    for i in range(5):
        print(i)


t1 = PythonOperator(
    task_id='print_thing',
    python_callable=print_thing,
    provide_context=True,
    op_kwargs=dict(
        thing='something',
    ),
    dag=dag,
)

t2 = PythonOperator(
    task_id='print_five',
    python_callable=print_five,
    dag=dag,
)

t1 >> t2