const router = require("express").Router();

const {
  getProject,
  getProjects,
  createProject,
  updateProject,
  deleteProject
} = require("../handlers/projectHandler");

/**
 *
 */
router.get("/", (req, res) => {
  res.status(201).json({ msg: "project created" });
});

/**
 *
 */
router.get("/:id", (req, res) => {
  res.json({ id: "test-id", name: "test-name" });
});

/**
 *
 */
router.post("/", createProject);

/**
 *
 */
router.put("/:id", updateProject);

module.exports = router;

// INSERT INTO projects(owner_id, title, status, info, tags) VALUES (1002, 'TypeScriupt Dev', 'opened', '{"industry":"IT"}', '{"JS", "extention"}');
