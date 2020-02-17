const express = require("express");
const auth = require("./api/middlewares/auth");
const router = express.Router();

const usersRouter = require("./api/components/user/routes");
const teamsRouter = require("./api/components/team/routes");
const projectsRouter = require("./api/components/project/routes");
const tasksRouter = require("./api/components/task/routes");
const comsmentsRouter = require("./api/components/comment/routes");

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
