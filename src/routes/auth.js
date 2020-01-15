const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

// const User = require("../models/User.js");
const { registerV, loginV } = require("../utils/validation");
const db = require("../db");

/**
 * Register a user
 */
router.post("/register", async (req, res) => {
  console.log("* [api/users/register] *");

  const { error } = await registerV(req.body);

  if (error) return res.send(error.details).status(400);

  // check for user uniqueness
  // const emailExist = await User.findOne({ email: req.body.email });
  const emailExist = await db.findUser({ email: req.body.email });
  console.log("emailExist : ", emailExist);
  if (emailExist) return res.send("Email is already exist").status(400);

  // salt [hash password]
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // todo this should be handled automatically
  // const created_at = new Date().toLocaleDateString().replace(/\//gi, "-");
  // const updated_at = new Date().toLocaleDateString().replace(/\//gi, "-");
  // const last_login = new Date().toLocaleDateString().replace(/\//gi, "-");

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  };

  try {
    const savedUser = await db.createUser(newUser);
    if (savedUser) res.status(201).json({ msg: "successfull insert" });
  } catch (err) {
    console.error(err);
    res.status(400).send(error);
  }
});

/**
 * Login a user
 */
router.post("/login", async (req, res) => {
  console.log("* [api/users/login] *");

  const { error } = await loginV(req.body);
  if (error) res.send(error.details).status(400);

  // check for user email exists
  try {
    const user = await db.findUser({ email: req.body.email });
    if (!user) return res.send("Email or password is wrong !").status(400);

    // salt [hash password]
    const validPsw = await bcrypt.compare(req.body.password, user.password);
    if (!validPsw) return res.send("Email or password is wrong !!").status(400);

    // create token
    const token = jwt.sign(
      {
        id: user.id
        //exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 1 day exp
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    res.header("Authorization", token);
    res.json({ token }).status(200);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
