const router = require("express").Router();

/**
 * teamId and projectid should be sent on the body
 */
router.get("/:id", (req, res) => {
  // req.body.teamId
  // req.body.projectId
  res.status(201).send({ msg: "task created" });
});

router.post("/", (req, res) => {
  res.status(201).send({ msg: "task created" });
});

module.exports = router;
