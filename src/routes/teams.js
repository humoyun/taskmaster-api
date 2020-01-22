const router = require("express").Router();

const {
  getAllTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam
} = require("../handlers/teamHandler");

/*
 * api/teams/
 */
router.get("/all", getAllTeams);

/*
 *
 */
router.get("/:id", getTeamById);

/*
 *
 */
router.post("/", createTeam);

/*
 *
 */
router.put("/:id", (req, res) => {
  res.status(201).json({ msg: `team updated by ${id}` });
});

/*
 *
 */
router.delete("/:id", (req, res) => {
  res.status(201).json({ msg: `team deleted by ${id}` });
});

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
