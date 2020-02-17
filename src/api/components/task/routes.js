const router = require("express").Router();

const {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require("./handler");

/**
 * teamId and projectid should be sent on the body
 */
router.get("/", getTasks);

/**
 * teamId and projectid should be sent on the body
 */
router.get("/:id", getTask);

/**
 *
 */
router.post("/", createTask);

/**
 *
 */
router.put("/:id", updateTask);

/**
 *
 */
router.delete("/:id", deleteTask);

module.exports = router;
