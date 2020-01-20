CREATE VIEW members_view AS
SELECT
  id,
  username,
  email,
  first_name || ' ' || last_name AS fullname,
  location,
  avatar,
  last_login
FROM
  members;