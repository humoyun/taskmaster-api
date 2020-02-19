/*
 *--------------------------------------------------*
 */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


/*
 *--------------------------------------------------*
 */
CREATE TYPE media_type AS ENUM (
  'image',
  'video',
  'file',
  'text'
);

CREATE TYPE priority_type AS ENUM (
  'high',
  'medium',
  'low'
);

CREATE TYPE status_type AS ENUM (
  'created',
  'started',
  'ongoing',
  'finished'
);

CREATE TYPE role_type AS ENUM (
  'master',
  'owner',
  'admin',
  'member',
  'guest'
);

CREATE TYPE state_type AS ENUM (
  'new',
  'assigned',
  'inprogress',
  'resolved',
  'closed'
);


/*
 *--------------------------------------------------*
 */
CREATE TABLE job_title (
  id serial PRIMARY KEY,
  title varchar(255) UNIQUE NOT NULL
);


/*
 *--------------------------------------------------*
 */
CREATE TABLE company (
  id serial PRIMARY KEY,
  name varchar(255) UNIQUE NOT NULL
);


/*
 *--------------------------------------------------*
 */
CREATE TABLE tags (
  id serial PRIMARY KEY,
  name varchar(50) UNIQUE NOT NULL
);


/*
 *--------------------------------------------------*
 */
CREATE TABLE members (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  username varchar(50) UNIQUE,
  email varchar(100) UNIQUE,
  password VARCHAR(255) NOT NULL,
  first_name varchar(100),
  last_name varchar(100),
  avatar varchar(255),
  avatar_thumb varchar(255),
  job_title varchar(255),
  location VARCHAR(200),
  verified boolean DEFAULT FALSE,
  active boolean DEFAULT FALSE,
  deleted boolean DEFAULT FALSE,
  info json,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  last_login timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE karmas (
  id serial PRIMARY KEY,
  id2 serial PRIMARY KEY
);


/*
 *--------------------------------------------------*
 */
CREATE TABLE teams (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES members (id),
  name varchar(255),
  description text,
  info json,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (owner_id, name)
);


/*
 *  ON DELETE SET NULL
 *--------------------------------------------------*
 */
CREATE TABLE team_member_pivot (
  id serial PRIMARY KEY,
  member_id uuid REFERENCES members (id),
  team_id uuid REFERENCES teams (id),
  ROLE role_type,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (member_id, team_id)
);

CREATE TABLE member_project_pivot (
  id serial PRIMARY KEY,
  member_id uuid REFERENCES members (id),
  project_id uuid REFERENCES projects (id),
  ROLE role_type,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (member_id, project_id)
);

ALTER SEQUENCE team_member_pivot_id_seq
  RESTART WITH 10000 INCREMENT BY 5;


/*
 owner_id uuid REFERENCES members(id),
 *--------------------------------------------------*
 */
CREATE TABLE projects (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  owner_id uuid REFERENCES members (id) NOT NULL,
  team_id uuid REFERENCES teams (id),
  title varchar(255) NOT NULL,
  status status_type DEFAULT 'created',
  description text,
  starred boolean DEFAULT FALSE,
  archived boolean DEFAULT FALSE,
  deleted boolean DEFAULT FALSE,
  info json,
  tags varchar[],
  cover_img varchar(255),
  cover_img_thumb varchar(255),
  due_at timestamp DEFAULT CURRENT_TIMESTAMP CHECK (due_at >= created_at),
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (owner_id, title)
);


/*
 * -------------------------------------------------- *
 */
CREATE TABLE sprints (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  project_id uuid REFERENCES projects (id) NOT NULL,
  title varchar(255) NOT NULL,
  info json,
  tags varchar[],
  due_at timestamp DEFAULT CURRENT_TIMESTAMP CHECK (due_at >= created_at),
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (project_id, title))
/*
 * watchers VARCHAR [] should be added
 *--------------------------------------------------*
 */
CREATE TABLE tasks (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  seq_id varchar(20),
  project_id uuid REFERENCES projects (id) NOT NULL,
  assignee_id uuid REFERENCES members (id),
  reporter_id uuid REFERENCES members (id),
  subject varchar(255) NOT NULL,
  description text,
  state state_type DEFAULT 'new',
  priority priority_type DEFAULT NULL,
  type VARCHAR(10) CHECK (TYPE IN ('bug', 'task', 'story')),
  flagged boolean DEFAULT FALSE,
  tags varchar[],
  info json,
  todo_list json,
  cover_image varchar(255),
  due_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (subject, project_id),
  UNIQUE (seq_id, project_id)
);


/*
 * it might contain @mentions [] field which is reference to other memners /
 *--------------------------------------------------*
 */
CREATE TABLE comments (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  owner_id serial REFERENCES members (id) ON DELETE CASCADE,
  content text,
  created_at date,
  updated_at date
);


/*
 *--------------------------------------------------*
 */
CREATE TABLE attachs (
  id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  task_id uuid REFERENCES tasks (id) ON DELETE CASCADE,
  file_url varchar(255),
  content text,
  type VARCHAR(20) CHECK (TYPE IN ('image', 'video', 'doc', 'link')),
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
);


/*
 *--------------------------------------------------*
 */
CREATE TABLE task_history (
  id uuid DEFAULT uuid_generate_v4 (),
  member_id uuid,
  operation varchar(255),
  prev_state varchar(255),
  /*  */
  created_at timestamp DEFAULT CURRENT_TIMESTAMP
);


/*
 *--------------------------------------------------*
 */
/*
 EXAMPLE :
 
 CREATE TABLE account (
 id serial primary key,
 name text,
 debt int,
 balance int
 );
 
 CREATE TABLE account_audit(
 id serial primary key,
 db_user text NOT NULL default session_user,
 operation text,
 account_id int,
 account_name text,
 debt int,
 balance int,
 created_at timestamp with time zone default current_timestamp
 );
 
 CREATE FUNCTION account_audit_func() RETURNS TRIGGER AS $$ BEGIN IF TG_OP = 'INSERT' THEN
 INSERT INTO account_audit (
 operation,
 account_id,
 account_name,
 debt,
 balance
 )
 VALUES
 (TG_OP, NEW.*);
 RETURN NEW;
 ELSIF TG_OP = 'UPDATE' THEN
 INSERT INTO account_audit (
 operation,
 account_id,
 account_name,
 debt,
 balance
 )
 VALUES
 (TG_OP, NEW.*);
 RETURN NEW;
 ELSIF TG_OP = 'DELETE' THEN
 INSERT INTO account_audit (
 operation,
 account_id,
 account_name,
 debt,
 balance
 )
 VALUES
 (TG_OP, OLD.*);
 RETURN OLD;
 END IF;
 END;
 $$ LANGUAGE plpgsql;
 */
