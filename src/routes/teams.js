const router = require("express").Router();
const verify = require("../utils/token_verify.js");
const db = require("../db");

/*
 * api/teams/
 */
router.get("/", verify, async (req, res) => {
  console.log("[api/teams/(all)]");
  const feilds = undefined;
  try {
    const teams = await db.findAll("teams", feilds);
    if (teams) {
      console.log("teams retrieved successfully");
      return res.status(201).send(teams);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: "db error" });
  }
});

/*
 *
 */
router.get("/:id", (req, res) => {
  res.status(201).json({ msg: `get team by ${id}` });
});

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
