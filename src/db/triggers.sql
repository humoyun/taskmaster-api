/* ------------------------------------------ */
CREATE
OR REPLACE FUNCTION insert_dates_of_members() RETURNS trigger AS $ func $ BEGIN
UPDATE
  members
SET
  created_at = now() :: date,
  updated_at = now() :: date,
  last_login = now()
WHERE
  id = currval('members_id_seq');

/* or `id = OLD.id;` */
RETURN NEW;

END;

$ func $ LANGUAGE plpgsql VOLATILE COST 100;

/* ------------------------------------------ */
CREATE TRIGGER dates_of_members
AFTER
INSERT
  ON members FOR EACH ROW EXECUTE PROCEDURE insert_dates_of_members();

/* ------------------------------------------ */
CREATE
OR REPLACE FUNCTION action_record() RETURNS trigger AS $ func $ BEGIN
/*---------------*/
CREATE FUNCTION passwd_func() RETURNS TRIGGER AS $ $ BEGIN IF length(NEW.password) < 10
OR NEW.password IS NULL THEN RAISE EXCEPTION 'password cannot be less than 10 characters';

END IF;

IF NEW.NAME IS NULL THEN RAISE EXCEPTION 'Name cannot be NULL';

END IF;

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

/* ------------------------------------------ */
CREATE
OR REPLACE FUNCTION member_last_login_update() RETURNS trigger AS $ func $ BEGIN
SELECT
  members
SET
  last_login = now() :: date
WHERE
  id = currval('members_id_seq');

RETURN NEW;

END;

$ func $ LANGUAGE plpgsql VOLATILE COST 100;