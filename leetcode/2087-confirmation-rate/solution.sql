-- Write your PostgreSQL query statement below
select
Signups.user_id
, round((count(Confirmations.user_id) filter (where action = 'confirmed'))::decimal / greatest(count(Confirmations.user_id), 1), 2) as confirmation_rate
from Signups
left join Confirmations on Signups.user_id = Confirmations.user_id
group by 1
