- I must point out that Nginx or other servers should be used in front of Node.js appto handle
  the SSL connection. Setting up an SSL connection is expensive, and as Node.js is single
  threaded, it would suffer in performance when having to deal with many SSL handshakes.
  Also, dedicated server software is much better at creating and handling SSL connections,
  with support for newer advanced HTTP features such as HTTP2.

- Add HSTS to the Connection
  The mechanism of HSTS is to send a Strict-Transport-Security header to the client specifying when the SSL policy will expire. The browser will then default to HTTPS when communicating with the application until this header expires

- Decide what gets logged

- Database always should be configured to use authenticated users
  Any database that you work with, and it doesn’t matter if we’re talking about MySQL, Mongo, Redis, or any other database system, should be configured to use authenticated users. Sometimes people don’t bother with user accounts and let everyone (including applications) connect to the database without a password. They typically block outside connections, which is a good thing to do. Unfortunately, it’s not sufficient, even if the database lives on the same machine. Yes, blocking outside connections narrows the attack surface significantly. But the attacker can bypass this restriction by gaining access to one of the whitelisted machines or the IP addresses

- Role-based connection
  make separate database accounts even if you already have separate user roles. Suppose you have a database injection vulnerability somewhere in the guest section of the application. Attackers who exploit this hole won’t be able to cause as much damage because the guest database user has only read privileges on the tables.
- next
