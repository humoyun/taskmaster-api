CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TYPE status_type AS ENUM ('opened', 'ongoing', 'finished');
CREATE TYPE state_type AS ENUM (
  'new',
  'assigned',
  'inprogress',
  'resolved',
  'closed'
);
CREATE TABLE role(
  role_id serial PRIMARY KEY,
  role_name VARCHAR (255) UNIQUE NOT NULL
);
CREATE TABLE job_title(
  id serial PRIMARY KEY,
  title VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE company(
  id serial PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL
);
CREATE TABLE tag(
  id serial PRIMARY KEY,
  name VARCHAR(50) UNIQUE NOT NULL
);
CREATE TABLE members(
  id serial START 1000 PRIMARY KEY,
  team_id uuid REFERENCES teams(id),
  username VARCHAR (50),
  email VARCHAR (100),
  password VARCHAR (255) NOT NULL,
  first_name VARCHAR (100),
  last_name VARCHAR (100),
  avatar VARCHAR(255),
  job_title VARCHAR(255),
  location VARCHAR(200),
  verified BOOLEAN DEFAULT f,
  info JSON,
  created_at DATE,
  updated_at DATE,
  last_login TIMESTAMP,
  UNIQUE (username, email)
);
CREATE TABLE teams(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id serial REFERENCES members(id),
  name VARCHAR (255) UNIQUE NOT NULL,
  description TEXT,
  info json,
  created_at DATE,
  updated_at DATE
);
CREATE TABLE projects(
  id uuid DEFAULT uuid_generate_v4(),
  owner_id REFERENCES user.id,
  title VARCHAR (255) NOT NULL,
  status VARCHAR (20) CHECK (status IN ('opened', 'ongoing', 'finished')),
  desc text,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  due_date DATE CHECK (due_date > created_at),
  info json,
  photos = ["imahe-url-1", "imahe-url-2"];
this.updatedAt = new Date().toISOString();
PRIMARY KEY teams(id)
);
CREATE TABLE tasks(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  assignee_id uuid REFERENCES members(id),
  reporter_id uuid REFERENCES members(id),
  project_id uuid REFERENCES projects(id),
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR (20) CHECK (
    status IN (
      'new',
      'assigned',
      'inprogress',
      'resolved',
      'closed'
    )
  ),
  priority VARCHAR (10) CHECK (priority IN ('high', 'medium', 'low')),
  type VARCHAR (10) CHECK (type IN ('bug', 'task')),
  /* important */
  flagged BOOL DEFAULT false,
  /* todo-list */
  checklist json,
  estimated_time TIME,
  created_at DATE,
  due_at DATE,
  updated_at DATE
);
/*-------------------------------------------------*/
CREATE TABLE attachs(
  id uuid DEFAULT uuid_generate_v4(),
  task_id uuid REFERENCES tasks(id),
  type VARCHAR(20) CHECK (type IN ('image', 'video', 'doc', 'link')),
);
price numeric CHECK (price > 0)
/* ---------------------------- */
CREATE TABLE task_history (
  id uuid DEFAULT uuid_generate_v4(),
  member_id uuid,
  operation VARCHAR(255),
  prev_state VARCHAR(255),
  /*  */
  created_at timestamp default current_timestamp
);
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