const router = require("express").Router();

const {
  getProject,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectTasks,
  getProjectComments
} = require("./handler");

/**
 *
 */
router.get("/", getProjects);

/**
 *
 */
router.get("/:id", getProject);

/**
 *
 */
router.get("/:id/tasks", getProjectTasks);

/**
 *
 */
router.get("/:id/comments", getProjectComments);

/**
 *
 */
router.post("/", createProject);

/**
 *
 */
router.put("/:id", updateProject);

/**
 *
 */
router.delete("/:id", deleteProject);

module.exports = router;

// INSERT INTO projects(owner_id, title, status, info, tags) VALUES (1002, 'TypeScriupt Dev', 'opened', '{"industry":"IT"}', '{"JS", "extention"}');
