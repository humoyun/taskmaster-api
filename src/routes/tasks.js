const router = require("express").Router();

/**
 * teamId and projectid should be sent on the body
 */
router.get("/", (req, res) => {
  // req.body.teamId
  // req.body.projectId
  res.json({ msg: "task created" });
});

/**
 * teamId and projectid should be sent on the body
 */
router.get("/:id", (req, res) => {
  res.json({ msg: "task created" });
});

/**
 *
 */
router.post("/", (req, res) => {
  // req.body.teamId
  // req.body.projectId
  res.status(201).json({ msg: "task created" });
});

/**
 *
 */
router.put("/:id", (req, res) => {
  res.json({ msg: "task created" });
});

/**
 *
 */
router.delete("/:id", (req, res) => {
  res.json({ msg: "task created" });
});

module.exports = router;
