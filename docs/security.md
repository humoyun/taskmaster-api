- I must point out that Nginx or other servers should be used in front of Node.js appto handle
  the SSL connection. Setting up an SSL connection is expensive, and as Node.js is single
  threaded, it would suffer in performance when having to deal with many SSL handshakes.
  Also, dedicated server software is much better at creating and handling SSL connections,
  with support for newer advanced HTTP features such as HTTP2.

- Add HSTS to the Connection
  The mechanism of HSTS is to send a Strict-Transport-Security header to the client specifying when the SSL policy will expire. The browser will then default to HTTPS when communicating with the application until this header expires

- Decide what gets logged

- then
-
