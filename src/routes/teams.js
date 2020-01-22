const router = require("express").Router();

const {
  getTeams,
  getTeam,
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
router.get("/:id/projects", (req, res) => {
  res.status(201).json({ msg: `get team/:id/projects by ${id}` });
});

/*
 *
 */
router.get("/:id/members", (req, res) => {
  res.status(201).json({ msg: `get team/:id/members by ${id}` });
});

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
