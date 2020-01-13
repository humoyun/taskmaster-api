const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

// const User = require("../models/User.js");
const { registerV, loginV } = require("../lib/validation");
const db = require("../db");

/**
 * get all users
 */

router.get("/all", async (req, res) => {
  console.log("users/all");
  // const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
  try {
    // const { error, rows } = await db.query("SELECT * FROM member");
    db.query("SELECT * FROM member", (err, resp) => {
      console.log(typeof resp.rows);
      res.send(resp.rows);
    });
  } catch (err) {
    res.status(500).json({ msg: "cannot retrieve data from db" });
    console.error(err);
  }
});

/**
 * Register a user
 */
router.post("/register", async (req, res) => {
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
  const created_at = new Date().toLocaleDateString().replace(/\//gi, "-");
  const updated_at = new Date().toLocaleDateString().replace(/\//gi, "-");
  const last_login = new Date().toLocaleDateString().replace(/\//gi, "-");

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    created_at,
    updated_at,
    last_login
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

// router.post('/profile', async (req, res) => {

// })

module.exports = router;
