-- Write your PostgreSQL query statement below
SELECT customer_id
, COUNT(0) AS count_no_trans
FROM Visits
WHERE NOT EXISTS (
    SELECT 1 FROM Transactions WHERE Visits.visit_id=Transactions.visit_id
)
GROUP BY 1
