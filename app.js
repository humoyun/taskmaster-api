const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const mainRouter = require("./routes/main.js");
const authRouter = require("./routes/auth.js");
const postsRouter = require("./routes/posts.js");

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, () => {
  console.log("connected to mongodb on MongoDBAtlas");
});

const app = express();

/**
 *
 * Middleware
 */
// body parser const bodyParser = require('body-parser')
// app.use(express.json({ extended: true }));
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(`${__dirname}/public`));

/**
 *
 * Route Middlewares
 */
app.use("/", mainRouter);
app.use("/api/user", authRouter);
app.use("/api/posts", postsRouter);

app.listen(5445, () => {
  console.log("server started on port 5445");
});
