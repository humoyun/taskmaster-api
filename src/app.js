const express = require("express");
const auth = require("./middlewares/auth");
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
router.use("/v1/posts", auth, postsRouter);
router.use("/v1/projects", auth, projectsRouter);
router.use("/v1/teams", auth, teamsRouter);
router.use("/v1/tasks", auth, tasksRouter);

// router.all("*", (req, res) => {
//   res.status(404).send({ msg: "not found" });
// });

module.exports = router;
