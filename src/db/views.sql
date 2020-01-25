CREATE VIEW members_view AS
SELECT
  id,
  username,
  email,
  first_name || ' ' || last_name AS fullname,
  location,
  avatar,
  avatar_thumb,
  last_login
FROM
  members;