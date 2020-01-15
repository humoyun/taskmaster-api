CREATE TABLE members(
  id serial start 1000 PRIMARY KEY,
  username VARCHAR (50) NOT NULL,
  email VARCHAR (100) NOT NULL,
  password VARCHAR (255) NOT NULL,
  first_name VARCHAR (100),
  last_name VARCHAR (100),
  avatar VARCHAR(255),
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
ALTER SEQUENCE members_id_seq RESTART WITH 1000;
INSERT INTO members (email, username, password, verified)
VALUES
  (
    'murod@prweb.com',
    'murod',
    '431acc8b7e36a148733b12b2615eb842f70a14a3817de23af1588b96ce1396eb',
    true
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Berkley',
    'Goozee',
    'bgoozee0@prweb.com',
    'bgoozee0',
    null,
    '431acc8b7e36a148733b12b2615eb842f70a14a3817de23af1588b96ce1396eb',
    false,
    null,
    '4/6/2016',
    '12/11/2019',
    '2019-09-20 11:55:36'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Parrnell',
    'Salzburg',
    'psalzburg1@reverbnation.com',
    'psalzburg1',
    'Venezuela',
    'd313216af1d2102a8b388276d6719469ea968b9004208d85bc24162e7af2c443',
    false,
    'https://robohash.org/ipsumremnam.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Hussein',
    'Roper',
    'hroper2@bigcartel.com',
    'hroper2',
    'Kosovo',
    '798a7e3a35dc0e8d8e2f8c37fb92c1711087454bedc54837e76cc289e7e5c2fc',
    false,
    'https://robohash.org/voluptatemexcepturinostrum.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Kimbell',
    'Wong',
    'kwong3@berkeley.edu',
    'kwong3',
    'Portugal',
    'f1dc24c4a1d790570c2d63bfc0e75388c536730447866381036f00ec8b51e2ab',
    false,
    'https://robohash.org/situtiure.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Rancell',
    'Maccrae',
    'rmaccrae4@youtu.be',
    'rmaccrae4',
    'Japan',
    '2c583c65415d38d20985980fb9c3c6ab2df2e7d258329b93f1d16a3cabb67815',
    true,
    'https://robohash.org/delectuseumea.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Sheridan',
    'Colloby',
    'scolloby5@delicious.com',
    'scolloby5',
    'China',
    '66af7af8f1f820935597fa252ecd013ed3cc5c1d41e93e54af2ea321a28f0fcf',
    false,
    'https://robohash.org/temporevoluptatumamet.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Glen',
    'Farres',
    'gfarres6@free.fr',
    'gfarres6',
    'China',
    'e81c405c338e7b6b5bf30142c664062dcaea2543b8c767e8f31ee05b0e4fccdb',
    false,
    'https://robohash.org/atqueestvoluptatem.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Gabriela',
    'Paintain',
    'gpaintain7@independent.co.uk',
    'gpaintain7',
    'Argentina',
    '54069a410237f33b39fc884cadc1a670056ac4bd15ba4c65a1109502f76a82b2',
    true,
    'https://robohash.org/nobisidcumque.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Cobbie',
    'Piddle',
    'cpiddle8@reddit.com',
    'cpiddle8',
    'Estonia',
    '8557683108054b1e4adca03ec114a89a4f7e4848b41ba02bfec565e9b81ed2aa',
    true,
    'https://robohash.org/consequunturquiducimus.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Ario',
    'Tattam',
    'atattam9@fc2.com',
    'atattam9',
    'Ukraine',
    '243aeffb217330be93a05ccd2052135788f194faedd1a30104fe580c12931f5c',
    true,
    'https://robohash.org/harumetnesciunt.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Ruben',
    'Duigenan',
    'rduigenana@topsy.com',
    'rduigenana',
    null,
    '77d0063201ffce5b37b9f7988d90bd64d0a72db2312a2271b44835bf327168a2',
    false,
    null
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Agnola',
    'Allward',
    'aallwardb@foxnews.com',
    'aallwardb',
    null,
    '9e38abd67c8fbceebfca0cf407f8db1b8801b34ac16092f2ae15cb0ce7975b7e',
    false,
    null
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Carmine',
    'Neylon',
    'cneylonc@usa.gov',
    'cneylonc',
    null,
    '98628515ec308742b020c890e0271bfa5a062b7cbeef96699129f604e30bbf1b',
    false,
    null
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Sutherland',
    'Asel',
    'saseld@hibu.com',
    'saseld',
    'Czech Republic',
    'c1358894975e93fdab55911bb4bb95ba0aabfc6b0c4a648c53ab2431088056c3',
    true,
    'https://robohash.org/quisquamidvoluptatem.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Valerye',
    'Issakov',
    'vissakove@goodreads.com',
    'vissakove',
    null,
    '457783ad97b0d50c2924f474c681c12be6f06a9990cf9c9a5697f37880d8ed3c',
    true,
    null
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    null,
    null,
    'ssailf@unesco.org',
    'llemingf',
    'Slovenia',
    '792ad10a90f4893dbd661c2ff44ce68b9ce72734bc3c250d1c23eccb903044fd',
    true,
    'https://robohash.org/excepturirepellendussit.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Costa',
    'Greschke',
    'cgreschkeg@google.de',
    'cgreschkeg',
    'Aruba',
    'b8a60b095159987beeae2ce7d2cb73cac9eb8809cc9d897aae4bacf513ce1bfd',
    true,
    'https://robohash.org/quisedaperiam.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Ardis',
    'Cawdery',
    'acawderyh@tumblr.com',
    'acawderyh',
    null,
    'e9391c7077ee532bf10c597ee345256852897ea7ad271616ab2219b887460b09',
    false,
    null
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Annecorinne',
    'Sommerville',
    'asommervillei@princeton.edu',
    'asommervillei',
    'Russia',
    '2a84aac96485abeae683fa2d19e184cc781745050ce3d0d63019216f0e611aa9',
    true,
    'https://robohash.org/etmaximeat.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    null,
    null,
    'asprottj@posterous.com',
    'eradagej',
    null,
    '57392c4b910c086e851408888baa0c845aba444ea67273c571352ec494b8acb0',
    true,
    null
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Pebrook',
    'Pickover',
    'ppickoverk@mozilla.com',
    'ppickoverk',
    'Macedonia',
    '1c220d6d30a6482001ac05a00f004ebf92b1a9cd5f6da7a95a3514493c18091a',
    false,
    'https://robohash.org/eaeosdolores.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Shaylyn',
    'Bratcher',
    'sbratcherl@marriott.com',
    'sbratcherl',
    'Sweden',
    'cc8f73b974f2fb91ad98874e219b77f8df7b851571073c469abcc850cfd836c5',
    false,
    'https://robohash.org/utaspernaturtemporibus.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    null,
    null,
    'lmatyasm@simplemachines.org',
    'dflitcroftm',
    'Greece',
    '57e1c63df9e317606b5f8d7f13ed91a885f6ff98bb2d1e2b169463b72df08d85',
    true,
    'https://robohash.org/quiquivoluptatem.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Isidore',
    'Tideswell',
    'itideswelln@sogou.com',
    'itideswelln',
    'Brazil',
    'a1283ce6bdc110d26d5f0e28099acdd71677b80e99a29f512fbda0e1b1adc1b1',
    true,
    'https://robohash.org/minimaetquas.jpg?size=150x150&set=set1'
  );
insert into member (
    first_name,
    last_name,
    email,
    username,
    location,
    password,
    verified,
    avatar
  )
values
  (
    'Rodrique',
    'Bough',
    'rbougho@theatlantic.com',
    'rbougho',
    'Portugal',
    '62d9d53db944e3f5c7e520a433e0d11d4aba63244b54a1b6c7df4445f5a1e977',
    false,
    'https://robohash.org/utaccusantiumcumque.jpg?size=150x150&set=set1'
  );