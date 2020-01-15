const router = require("express").Router();
const db = require("../db");

/*
 * api/teams/
 */
router.get("/", async (req, res) => {
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

module.exports = router;
