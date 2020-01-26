const express = require("express");
const auth = require("./middlewares/auth");
const router = express.Router();

const mainRouter = require("./routes/main.js");
const usersRouter = require("./routes/users.js");

const tasksRouter = require("./routes/tasks.js");
const projectsRouter = require("./routes/projects.js");
const teamsRouter = require("./routes/teams.js");
const commentsRouter = require("./routes/comments.js");

/**
 *
 * Route Middlewares
 */
router.use(mainRouter);
router.use("/v1/users", usersRouter);
router.use("/v1/projects", auth, projectsRouter);
router.use("/v1/teams", auth, teamsRouter);
router.use("/v1/tasks", auth, tasksRouter);
router.use("/v1/comments", auth, commentsRouter);
// router.all("*", (req, res) => {
//   res.status(404).send({ msg: "not found" });
// });

module.exports = router;
