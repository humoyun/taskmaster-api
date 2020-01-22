const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const token = require("../models/Token");

const db = require("../db");
const { registerV, loginV } = require("../utils/validation");

const fields = [
  "id",
  "username",
  "email",
  "first_name",
  "last_name",
  "avatar",
  "avatar_thumb",
  "job_title",
  "location",
  "verified",
  "info",
  "last_login"
];

exports.getAllMembers = async (req, res) => {
  console.log("[get] v1/users/all");

  try {
    const conditions = {};
    const members = await db.findAll("members", conditions, fields);
    console.log("getAllMembers: ", members.length, " members");
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
  console.log("[get] v1/users/:id");
  const memberId = req.params.id;

  try {
    const conditions = { id: memberId };
    const member = await db.findOne("members", conditions, fields);
    console.log("get member by id: : ", member);
    res.send(member);
  } catch (err) {
    res.status(500).json({ msg: "cannot retrieve data from db" });
    console.error(err);
  }
};

exports.deleteMemberById = async (req, res) => {
  console.log("[delete] v1/users/:id");
  const memberId = req.params.id;

  try {
    const conditions = { id: memberId };
    const dataBack = ["id", "username", "email"];

    const member = await db.deleteOne("members", conditions, dataBack);

    if (!member)
      return res.status(404).json({ msg: "User not found by this id" });
    else res.send(member);
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 */
exports.login = async (req, res) => {
  console.log("[post] [api/users/login] *");

  const { error } = await loginV(req.body);
  if (error) res.status(400).json({ msg: error.details });

  // check for user email exists
  try {
    const fields = ["*"];
    const conditions = {};

    if (req.body.email) conditions.email = req.body.email;
    if (req.body.username) conditions.username = req.body.username;

    const user = await db.findOne("members", conditions, fields);

    if (!user)
      return res.status(400).send({ msg: "Email or password is wrong !!" });

    // salt [hash password]
    const validPsw = await bcrypt.compare(req.body.password, user.password);
    if (!validPsw) return res.status(400).send("Email or password is wrong !!");

    // create token
    const token = jwt.sign(
      {
        id: user.id, // needed for authentication
        role: "" // needed for authorization
        // exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 day exp
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

  if (error) return res.send(error.details[0].message).status(400);

  const fields = ["*"];
  const conditions = {
    email: req.body.email
  };
  // check for user uniqueness
  const emailExist = await db.findOne("members", conditions, fields);

  console.log("emailExist : ", emailExist);
  if (emailExist) return res.send("Email is already exist").status(400);

  // salt [hash password]
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  };

  try {
    const savedUser = await db.createUser(newUser);
    if (savedUser)
      res.status(201).json({
        msg: `user ${savedUser.username} created successfully`
      });
  } catch (err) {
    console.error(err);
    res.status(400).send(error);
  }
};

exports.logout = async (req, res) => {};

exports.verify = async (req, res) => {};

exports.passwordReset = async (req, res) => {};
