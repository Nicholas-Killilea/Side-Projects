-- schema.sql
-- Table structure for tasks

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET default_tablespace = '';
SET default_table_access_method = heap;

-- Create tasks table
CREATE TABLE public.tasks (
    id integer NOT NULL,
    task character varying(255) NOT NULL,
    description text,
    priority integer DEFAULT 1 NOT NULL,
    created_on date NOT NULL,
    due_date date,
    estimated_hours numeric,
    status character varying(20) DEFAULT 'to-do'::character varying NOT NULL
);

ALTER TABLE public.tasks OWNER TO postgres;

-- Set up auto-increment for id column
ALTER TABLE public.tasks ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

-- Add primary key constraint
ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);