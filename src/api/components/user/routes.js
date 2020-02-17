const router = require("express").Router();
const auth = require("../../middlewares/auth");
// const User = require("../models/User.js");

const {
  login,
  register,
  logout,
  passwordReset,
  verify,
  getMembers,
  getMember,
  deleteMember,
  getMemberTeams,
  getMemberProjects
} = require("./handler");

/**
 * Get all users
 */
router.get("/all", auth, getMembers);

/**
 * Get user by id
 */
router.get("/:id", auth, getMember);

/**
 * Get user by id
 */
router.get("/:id/teams", auth, getMemberTeams);

/**
 * Get user by id
 */
router.get("/:id/projects", auth, getMemberProjects);
/**
 * Get user by id
 */
router.delete("/:id", auth, deleteMember);

/**
 * Register a user
 */
router.post("/register", register);

/**
 * Login a user
 */
router.post("/login", login);

/**
 *
 */
router.get("/logout", logout);

/**
 *
 */
router.patch("/password-reset", passwordReset);
router.post("/verify", verify);
// router.post('/profile', async (req, res) => {

// })

module.exports = router;
