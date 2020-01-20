CREATE TABLE members(
  id serial start 1000 PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  email VARCHAR (100) NOT NULL,
  password VARCHAR (255) NOT NULL,
  first_name VARCHAR (100),
  last_name VARCHAR (100),
  avatar VARCHAR(255),
  avatar_thumb VARCHAR(255),
  job_title VARCHAR(255),
  company VARCHAR(255),
  location VARCHAR(200),
  verified BOOLEAN,
  info JSON,
  created_at DATE,
  updated_at DATE,
  last_login TIMESTAMP,
  UNIQUE(email, username)
);

/* https://randomuser.me/api/portraits/men/{1..70}.jpg */
/* https://i.pravatar.cc/{100...1000}?img={1..70} */
/* https://picsum.photos */
/* ALTER SEQUENCE members_id_seq RESTART WITH 1000 */
INSERT INTO
  members (
    username,
    email,
    password,
    first_name,
    last_name,
    avatar,
    avatar_thumb,
    company,
    location
  )
VALUES
  (
    'murod',
    'murod@prweb.com',
    '$2b$10$GQeYE2rRmBtUeX1c/eihru6waWZdYS2NFBgoplnPx9Jkq1sTR/CIK',
    'Murod',
    'Mamatov',
    'https://i.pravatar.cc/300?img=70',
    'https://i.pravatar.cc/100?img=70',
    'Booking.com',
    'Nertherlands'
  );

/* good exampkle of combining multiple columns into one fullname = first_name+last_name */
SELECT
  cu.customer_id AS id,
  cu.first_name || ' ' || cu.last_name AS name,
  a.address,
  a.postal_code AS "zip code",
  a.phone,
  city.city,
  country.country,
  CASE
    WHEN cu.activebool THEN 'active'
    ELSE ''
  END AS notes,
  cu.store_id AS sid
FROM
  customer cu
  INNER JOIN address a USING (address_id)
  INNER JOIN city USING (city_id)
  INNER JOIN country USING (country_id);