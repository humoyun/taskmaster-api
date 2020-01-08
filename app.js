const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 3003;

dotenv.config();

const mainRouter = require("./routes/main.js");
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts.js");
const tasksRouter = require("./routes/tasks.js");
const projectsRouter = require("./routes/projects.js");
const teamsRouter = require("./routes/teams.js");


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
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log("server started on port 3003");
});
