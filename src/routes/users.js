const router = require("express").Router();

// const User = require("../models/User.js");

const {
  login,
  register,
  logout,
  passwordReset,
  verify,
  getAllMembers,
  getMemberById
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
