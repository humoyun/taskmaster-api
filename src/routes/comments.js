const router = require("express").Router();

const {
  getComment,
  getComments,
  createComment,
  updateComment,
  deleteComment
} = require("../handlers/commentHandler");

/**
 * comment and projectid should be sent on the body
 */
router.get("/", getComments);

/**
 * comment and projectid should be sent on the body
 */
router.get("/:id", getComment);

/**
 *
 */
router.post("/", createComment);

/**
 *
 */
router.put("/:id", updateComment);

/**
 *
 */
router.delete("/:id", deleteComment);

module.exports = router;
