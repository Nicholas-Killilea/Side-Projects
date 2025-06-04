-- data.sql
-- Sample data for tasks table

INSERT INTO public.tasks (id, task, description, priority, created_on, due_date, estimated_hours, status) OVERRIDING SYSTEM VALUE VALUES (1, 'clean my bathroom', 'clean toilet, shower, and mirror', 4, '2025-06-03', '2025-06-05', 1, 'to-do');
INSERT INTO public.tasks (id, task, description, priority, created_on, due_date, estimated_hours, status) OVERRIDING SYSTEM VALUE VALUES (2, 'clean my room', 'sweep, dust, and fold laundry', 3, '2025-06-03', '2025-06-04', 2, 'in-progress');

-- Reset the sequence to match the highest ID
SELECT pg_catalog.setval('public.tasks_id_seq', 2, true);