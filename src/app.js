const express = require("express");
const auth = require("./api/middlewares/auth");
const router = express.Router();

const usersRouter = require("./api/modules/user/routes");
const teamsRouter = require("./api/modules/team/routes");
const projectsRouter = require("./api/modules/project/routes");
const tasksRouter = require("./api/modules/task/routes");
const comsmentsRouter = require("./api/modules/comment/routes");

/**
 *
 * Route Middlewares
 */
router.use("/v1/users", usersRouter);
router.use("/v1/projects", auth, projectsRouter);
router.use("/v1/teams", auth, teamsRouter);
router.use("/v1/tasks", auth, tasksRouter);
router.use("/v1/comments", auth, comsmentsRouter);
// router.all("*", (req, res) => {
//   res.status(404).send({ msg: "not found" });
// });

module.exports = router;
