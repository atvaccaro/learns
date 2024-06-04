-- Write your PostgreSQL query statement below
with reports as (
    select managerId
    from Employee
    group by 1
    having count(managerId) >= 5
)
select name
from Employee
inner join reports on Employee.id = reports.managerId
