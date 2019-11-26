Feature: Showing off behave

  Scenario: Run a simple test
    Given we have behave installed
    When we implement 5 tests
    Then behave will test them for us!

  Scenario: Run a test with a table
    Given a set of numbers
      | a | b |
      | 1 | 2 |
      | 3 | 4 |
    When we multiply the numbers
    Then we get the results we expect
      | result |
      | 2      |
      | 12     |