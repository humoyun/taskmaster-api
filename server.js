const express = require("express");
// const helmet = require("helmet");
// const multer = require("multer");
// const logger = require("morgan");
const redis = require("redis");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = redis.createClient({
  host: "localhost",
  port: 6379,
  // db: 1,
  ttl: 60 * 60 // TTL of 1 hour represented in seconds
});

// redisClient.unref();
redisClient.on("error", console.log);
const store = new RedisStore({ client: redisClient });

const debug = require("debug")("myapp:server");
const app = express();

const router = require("./src/app");
const PORT = process.env.PORT || 3003;
// const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, () => {
//   console.log("connected to mongodb on MongoDBAtlas");
// });
app.use(express.static(`${__dirname}/public`));

const isProd = () => process.env.NODE_ENV === "production";

//session
app.use(
  session({
    store,
    // genid: req => {
    //   return uuid();
    // },
    // rolling: false, // defaults to false, according to docs
    cookie: {
      path: "/",
      httpOnly: true,
      secure: isProd() ? true : false,
      maxAge: 20 * 60 * 1000 // 20 min
      // sameSite: "none"
    },
    key: "_id", // use a generic id
    // name: "_id",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

/**
 * cookie => httpOnly: true
 *
 * We can mitigate XSS attack vectors by preventing JavaScript from accessing the cookie contents.
 * Use the httpOnly setting, which was specifically designed for that purpose,
 * so that only browser requests have access to the cookie
 */

/**
 *
 * Middleware
 */
// body parser const bodyParser = require('body-parser')
// app.use(express.json({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());
// app.use(helmet());

app.use(router);
/**
 * Attackers can use this header (which is enabled by default) to detect apps
 * running Express and then launch specifically-targeted attacks
 * or use Helmet
 */
app.disable("x-powered-by");

app.listen(PORT, () => {
  debug(`HTTP Server started on port: ${PORT}`);
});
