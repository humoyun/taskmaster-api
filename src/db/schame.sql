/*
 *--------------------------------------------------*
 */
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

/*
 *--------------------------------------------------*
 */
CREATE TYPE media_type AS ENUM ('image', 'video', 'file', 'text');

CREATE TYPE priority_type AS ENUM ('high', 'medium', 'low');

CREATE TYPE status_type AS ENUM ('created', 'started', 'ongoing', 'finished');

CREATE TYPE role_type AS ENUM ('master', 'owner', 'admin', 'member', 'guest');

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
CREATE TABLE job_title(
  id serial PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL
);

/*
 *--------------------------------------------------*
 */
CREATE TABLE company(
  id serial PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);

/*
 *--------------------------------------------------*
 */
CREATE TABLE tags(
  id serial PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);

/*
 *--------------------------------------------------*
 */
CREATE TABLE members(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  username VARCHAR (50) UNIQUE,
  email VARCHAR (100) UNIQUE,
  password VARCHAR (255) NOT NULL,
  first_name VARCHAR (100),
  last_name VARCHAR (100),
  avatar VARCHAR(255),
  avatar_thumb VARCHAR(255),
  job_title VARCHAR(255),
  location VARCHAR(200),
  verified BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,
  info JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE karmas(
  id serial PRIMARY KEY,
  id2 serial PRIMARY KEY
);

/*
 *--------------------------------------------------*
 */
CREATE TABLE teams(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id uuid NOT NULL REFERENCES members(id),
  name VARCHAR (255),
  description TEXT,
  info json,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(owner_id, name)
);

/*
 *  ON DELETE SET NULL
 *--------------------------------------------------*
 */
CREATE TABLE team_member_pivot(
  id serial PRIMARY KEY,
  member_id uuid REFERENCES members(id),
  team_id uuid REFERENCES teams(id),
  role role_type,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(member_id, team_id)
);

CREATE TABLE member_project_pivot(
  id serial PRIMARY KEY,
  member_id uuid REFERENCES members(id),
  project_id uuid REFERENCES projects(id),
  role role_type,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(member_id, project_id)
);

ALTER SEQUENCE team_member_pivot_id_seq RESTART WITH 10000 INCREMENT BY 5;

/*
 owner_id uuid REFERENCES members(id),
 *--------------------------------------------------*
 */
CREATE TABLE projects(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id uuid DEFAULT uuid_generate_v4() REFERENCES members(id) NOT NULL,
  team_id uuid DEFAULT uuid_generate_v4() REFERENCES teams(id),
  title VARCHAR (255) NOT NULL,
  status status_type DEFAULT 'created',
  description text,
  starred BOOLEAN DEFAULT false,
  archived BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,
  info json,
  tags VARCHAR [],
  cover_img VARCHAR(255),
  cover_img_thumb VARCHAR(255),
  due_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP CHECK (due_at >= created_at),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(owner_id, title)
);

/*
 * watchers VARCHAR [] should be added
 *--------------------------------------------------*
 */
CREATE TABLE tasks(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  seq_id VARCHAR(20),
  project_id uuid REFERENCES projects(id) NOT NULL,
  assignee_id uuid REFERENCES members(id),
  reporter_id uuid REFERENCES members(id),
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  state state_type DEFAULT 'new',
  priority priority_type DEFAULT NULL,
  type VARCHAR (10) CHECK (type IN ('bug', 'task', 'story')),
  flagged BOOLEAN DEFAULT false,
  tags VARCHAR [],
  info json,
  todo_list json,
  cover_image VARCHAR(255),
  due_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(subject, project_id),
  UNIQUE(seq_id, project_id)
);

/*
 * it might contain @mentions [] field which is reference to other memners /
 *--------------------------------------------------*
 */
CREATE TABLE comments(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id serial REFERENCES members(id) ON DELETE CASCADE,
  content TEXT,
  created_at DATE,
  updated_at DATE
);

/*
 *--------------------------------------------------*
 */
CREATE TABLE attachs(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE,
  file_url VARCHAR(255),
  content TEXT,
  type VARCHAR(20) CHECK (type IN ('image', 'video', 'doc', 'link')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*
 *--------------------------------------------------*
 */
CREATE TABLE task_history (
  id uuid DEFAULT uuid_generate_v4(),
  member_id uuid,
  operation VARCHAR(255),
  prev_state VARCHAR(255),
  /*  */
  created_at timestamp default current_timestamp
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