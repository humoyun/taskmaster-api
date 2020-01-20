const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../db");
const { registerV, loginV } = require("../utils/validation");

exports.getAllMembers = async (req, res) => {
  console.log("users/all");

  try {
    // const { error, rows } = await db.query("SELECT * FROM member");
    const fields = undefined;
    const members = await db.findAll("members", fields);
    console.log("getAllMembers: ", members);
    res.send(members);
  } catch (err) {
    res.status(500).json({ msg: "cannot retrieve data from db" });
    console.error(err);
  }
};

/**
 *
 */
exports.getMemberById = async (req, res) => {
  console.log("v1/users/:id");
  const memberId = req.params.id;
  console.log("member id: ", memberId);

  try {
    const fields = undefined;
    const members = await db.findOneById("members", memberId, fields);
    console.log("getAllMembers: ", members);
    res.send(members);
  } catch (err) {
    res.status(500).json({ msg: "cannot retrieve data from db" });
    console.error(err);
  }
};

exports.search = async (req, res) => {};

/**
 *
 */
exports.login = async (req, res) => {
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
};

/**
 *
 */
exports.register = async (req, res) => {
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
};

exports.logout = async (req, res) => {};

exports.verify = async (req, res) => {};

exports.passwordReset = async (req, res) => {};
// exports.logout = async (req, res) => {};
