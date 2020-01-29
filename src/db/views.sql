CREATE VIEW v_members AS
SELECT
  id,
  username,
  email,
  first_name || ' ' || last_name AS fullname,
  location,
  avatar,
  active,
  verified,
  last_login,
  created_at
FROM
  members;

CREATE VIEW v_projects AS
SELECT
  id,
  owner_id,
  team_id,
  title,
  deleted,
  status,
  tags,
  cover_img,
  due_at,
  created_at
FROM
  projects;

CREATE VIEW v_teams AS
SELECT
  id,
  owner_id,
  name,
  created_at
FROM
  teams;