const router = require("express").Router();

const {
  getTeams,
  getTeam,
  getTeamMembers,
  getTeamProjects,
  createTeam,
  updateTeam,
  deleteTeam
} = require("../handlers/teamHandler");

/*
 * api/teams/
 */
router.get("/", getTeams);

/*
 *
 */
router.get("/:id", getTeam);

/*
 *
 */
router.get("/:id/members", getTeamMembers);

/*
 *
 */
router.get("/:id/projects", getTeamProjects);

/*
 *
 */
router.post("/", createTeam);

/*
 *
 */
router.put("/:id", updateTeam);

/*
 *
 */
router.delete("/:id", deleteTeam);

/*
 *
 */
router.get("/:id/tasks", (req, res) => {
  res.status(201).json({ msg: `get team/:id/tasks by ${id}` });
});

/*
 *
 */
router.get("/:id/project/:pid/tasks", (req, res) => {
  res.status(201).json({ msg: `get team/:id/project/:pid/tasks by ${id}` });
});

module.exports = router;
