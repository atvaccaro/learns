-- Write your PostgreSQL query statement below
SELECT
    name
    , bonus
FROM Employee
LEFT JOIN Bonus USING (empId)
WHERE Bonus.bonus < 1000 OR Bonus.bonus IS NULL
