const router = require("express").Router();
const auth = require("../middlewares/auth");
// const User = require("../models/User.js");

const {
  login,
  register,
  logout,
  passwordReset,
  verify,
  getAllMembers,
  getMemberById,
  deleteMemberById
} = require("../handlers/userHandler");

/**
 * Get all users
 */
router.get("/all", getAllMembers);

/**
 * Get user by id
 */
router.get("/:id", getMemberById);
/**
 * Get user by id
 */
router.delete("/:id", deleteMemberById);

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
router.post("/veriy", verify);
// router.post('/profile', async (req, res) => {

// })

module.exports = router;
