const router = require("express").Router();

/**
 * always query params: type [project, task], id: [projectId, taskId]
 */
router.get("/", (req, res) => {
  console.log(req.path);
  console.log(req.params);
  console.log(req.query);
  res.json({ msg: "project/task comment" });
});

module.exports = router;
