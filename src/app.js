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
router.use("/v1/users", usersRouter);
router.use("/v1/posts", postsRouter);
router.use("/v1/projects", projectsRouter);
router.use("/v1/teams", teamsRouter);
router.use("/v1/tasks", tasksRouter);

// router.all("*", (req, res) => {
//   res.status(404).send({ msg: "not found" });
// });

module.exports = router;
