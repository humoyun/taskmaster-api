const express = require("express");

const router = express.Router();

const mainRouter = require("./routes/main.js");
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts.js");
const tasksRouter = require("./routes/tasks.js");
const projectsRouter = require("./routes/projects.js");
const teamsRouter = require("./routes/teams.js");

/**
 *
 * Route Middlewares
 */
router.use(mainRouter);
router.use("/api/users", usersRouter);
router.use("/api/posts", postsRouter);
router.use("/api/projects", projectsRouter);
router.use("/api/teams", teamsRouter);
router.use("/api/tasks", tasksRouter);

// router.all("*", (req, res) => {
//   res.status(404).send({ msg: "not found" });
// });

module.exports = router;
