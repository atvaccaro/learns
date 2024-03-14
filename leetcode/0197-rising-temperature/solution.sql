-- Write your PostgreSQL query statement below
SELECT Weather.id
FROM Weather
INNER JOIN Weather prior_days
    ON Weather.recordDate - INTERVAL '1 day' = prior_days.recordDate
WHERE Weather.temperature > prior_days.temperature
