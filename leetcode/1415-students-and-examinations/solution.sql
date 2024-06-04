-- Write your PostgreSQL query statement below
with exam_counts as (
    select student_id, subject_name, count(0) as cnt
    from Examinations
    group by 1, 2
)
select
students.student_id
, students.student_name
, subjects.subject_name
, coalesce(exam_counts.cnt, 0) as attended_exams
from Students
cross join Subjects
left join exam_counts
    on Students.student_id = exam_counts.student_id
    and Subjects.subject_name = exam_counts.subject_name
order by student_id, subject_name
