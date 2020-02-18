const router = require("express").Router();

const {
  getSprint,
  getSprints,
  createSprint,
  updateSprint,
  deleteSprint
} = require("./handler");

/**
 * teamId and projectid should be sent on the body
 */
router.get("/", getSprints);

/**
 * teamId and projectid should be sent on the body
 */
router.get("/:id", getSprint);

/**
 *
 */
router.post("/", createSprint);

/**
 *
 */
router.put("/:id", updateSprint);

/**
 *
 */
router.delete("/:id", deleteSprint);

module.exports = router;
