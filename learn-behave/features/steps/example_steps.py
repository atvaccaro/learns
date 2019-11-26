from unittest import TestCase

from behave import given, when, then, step


@given('we have behave installed')
def step_impl(context):
    pass


@when('we implement {number:d} tests')
def step_impl(context, number):  # -- NOTE: number is converted into integer
    assert number > 1 or number == 0
    context.tests_count = number


@then('behave will test them for us!')
def step_impl(context):
    assert context.failed is False
    assert context.tests_count >= 0


@given('a set of numbers')
def step_impl(context):
    context.numbers = context.table


@when('we multiply the numbers')
def step_impl(context):
    context.results = [int(row['a']) * int(row['b']) for row in context.numbers]


@then('we get the results we expect')
def step_impl(context):
    expected = [int(row['result']) for row in context.table]
    TestCase().assertListEqual(context.results, expected)
