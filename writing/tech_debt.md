# What is (a) technical debt?
Borrowing future time to ship faster now by cutting corners.

Most of this is stolen from Martin Fowler's blog posts on the subject.

## What does it look like?
![Credit: Martin Fowler](https://www.martinfowler.com/articles/is-quality-worth-cost/cruft-impact.png)

Credit: Martin Fowler

## [A Mess is not a Technical Debt.](https://sites.google.com/site/unclebobconsultingllc/a-mess-is-not-a-technical-debt)
Tech debt is a deliberate choice to move faster at the expense of future changes being more difficult and taking more time.
Bad code is not technical debt by itself; it could just be a mess.

## Why is it worth doing things correctly?
Keeping code quality high is actually cheaper eventually!
>* Neglecting internal quality leads to rapid build up of cruft
>* This cruft slows down feature development
>* Even a great team produces cruft, but by keeping internal quality high, is able to keep it under control
>* High internal quality keeps cruft to a minimum, allowing a team to add features with less effort, time, and cost.

![](https://www.martinfowler.com/articles/is-quality-worth-cost/both.png)

## [Quantifying technical debt](https://kellysutton.com/2017/10/24/quantifying-technical-debt.html)
Quantifying the principal and interest is very important. Otherwise, how would you know if it's worth spending time
fixing the debt?

At its core, the debt truly is monetary. Paying engineers to maintain indebted systems means fewer releases and more
time spent paying interest than shipping.

Track one of the following:
* Time - track time spent on various things
* Money - evaluate how much money is being spent per feature
* Bugs - count linter failures or execution errors/crashes