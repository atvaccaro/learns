# Incremental Quality
>Always leave it better than you left it.

## Why is some code good and some code bad?
Potter Stewart:
>I shall not today attempt further to define the kinds of material I understand to be embraced within that shorthand description, and perhaps I could never succeed in intelligibly doing so. But I know it when I see it…

### Identifying bad code
Tim Stewart:
>If the implementation is hard to explain, it's a bad idea. If the implementation is easy to explain, it may be a good idea.

From [The Zen of Python](https://www.python.org/dev/peps/pep-0020/#id3).

### Coupling and Cohesion [link](https://www.geeksforgeeks.org/software-engineering-coupling-and-cohesion/)
* Coupling
  * Interdependence between modules
  * Ideally, only necessary data (and no unnecessary data) is passed between modules
* Cohesion
  * Relatedness within a module
  * Logical is bad, coincidental is worse
  * Functional is best

### Overrated stuff
* Project organization
* "Encapsulation"
* Function length

### Appropriately-rated stuff
* Architecture
* Design patterns

### Underrated stuff
* Names
* Readability
* Function length (ha!)

## Testing?

### Unit tests
Tests on the smallest unit of code possible, often functions or classes.

No outside interaction; other function calls are usually mocked.

Fast to run, easy to implement.

Very helpful for reading comprehension.

### Integration tests
Making sure all the pieces fit together.

Often actually interact with a database or the filesystem.

Provide safety bumpers when refactoring code substantially.

Prevents regressions introduced by changing module interfaces.

Still uses canned data.

### Acceptance tests
Check that the overall system solves the problems of the user.

Prevents regressions introduced by changing business logic.

This is where real data might come in.

## Incremental quality how-to
1. Get annoyed or confused by something
1. `git blame` the culprit and ask them what’s up
1. Write new tests (and/or modify existing ones)
1. Run the tests
1. Make changes
1. GOTO #3 

## Necessary but not sufficient
No one type of test is sufficient!

They do vary in usefulness depending on the situation.

Complicated functions probably require unit tests.

Impactful functions probably require acceptance tests.
