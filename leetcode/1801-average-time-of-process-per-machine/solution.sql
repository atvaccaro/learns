-- Write your PostgreSQL query statement below
WITH durations AS (
    SELECT
        ActivityEnd.machine_id
        , ActivityEnd.process_id
        , ActivityEnd.timestamp - ActivityStart.timestamp AS processing_time
    FROM Activity as ActivityEnd
    INNER JOIN Activity as ActivityStart
        ON ActivityEnd.activity_type = 'end'
            AND ActivityStart.activity_type = 'start'
            AND ActivityEnd.machine_id = ActivityStart.machine_id
            AND ActivityEnd.process_id = ActivityStart.process_id
    
)
SELECT
    machine_id
    , ROUND(AVG(processing_time)::NUMERIC, 3) AS processing_time
FROM durations
GROUP BY 1
