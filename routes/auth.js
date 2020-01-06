const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const User = require("../models/User.js");
const { registerV, loginV } = require('../lib/validation');

/**
 * Register a user
 */
router.post("/register", async (req, res) => {
  const { error } = await registerV(req.body);

  if (error) return res.send(error.details).status(400);

  // check for user uniqueness
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.send("Email is already exist").status(400);

  // salt [hash password]
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  });

  try {
    const savedUser = await newUser.save();
    res.send(savedUser._id);
  } catch (err) {
    console.error(err);
    res.status(400).send(error);
  }
});

/**
 * Login a user
 */
router.post("/login", async (req, res) => {
  const { error } = await loginV(req.body);
  if (error) res.send(error.details).status(400);

  // check for user email exists
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send("Email or password is wrong !").status(400);
  
    // salt [hash password]
    const validPsw = await bcrypt.compare(req.body.password, user.password);
    if (!validPsw) return res.send("Email or password is wrong !!").status(400);
  
    // create token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token);
    res.send({ token });
  } catch (err) {
    console.error(err)
  }
});


module.exports = router;
