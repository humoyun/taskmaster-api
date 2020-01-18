const express = require("express");
// const helmet = require("helmet");
// const multer = require("multer");
// const logger = require("morgan");
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

app.listen(PORT, () => {
  debug(`HTTP Server started on port: ${PORT}`);
});