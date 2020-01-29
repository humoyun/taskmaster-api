const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
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

exports.getMembers = async (req, res) => {
  console.log("[GET] {api/v1/users}");

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
exports.getMember = async (req, res) => {
  console.log("[GET] {api/v1/users/:id}");
  const memberId = req.params.id;

  try {
    const conditions = { id: memberId };
    const member = await db.findOne("members", conditions, fields);
    console.log("get member by id: : ", member);
    if (member) {
      return res.send(member);
    }
    res.status(404).json({ msg: "User not found" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.error(err);
  }
};

/**
 *
 */
exports.getMemberTeams = async (req, res) => {
  console.log("[GET] {api/v1/users/:id/teams}");
  const memberId = req.params.id;

  try {
    const conditions = { id: memberId };
    const member = await db.findOne("members", conditions, fields);
    console.log("get member by id: : ", member);
    if (member) {
      return res.send(member);
    }
    res.status(404).json({ msg: "User not found" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.error(err);
  }
};

/**
 *
 */
exports.getMemberProjects = async (req, res) => {
  console.log("[GET] {api/v1/users/:id/projects}");
  const memberId = req.params.id;

  try {
    const conditions = { id: memberId };
    const member = await db.findOne("members", conditions, fields);
    console.log("get member by id: : ", member);
    if (member) {
      return res.send(member);
    }
    res.status(404).json({ msg: "User not found" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
    console.error(err);
  }
};

/**
 *
 */
exports.deleteMember = async (req, res) => {
  console.log("[DELETE] {api/v1/users/:id} ");
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
 * todo: we need to setup cache layer so that not to query db everytime
 * user info with all teams roles put it into session store: redis
 * todo: in postgres make trigger to update last_login field make the user active
 * todo: and do the opposite in logout handler
 */
exports.login = async (req, res) => {
  console.log("[POST] {api/v1/users/login}");
  console.log("User-Agent: ", req.get("User-Agent"));
  console.log("Accept-Encoding: ", req.get("Accept-Encoding"));
  console.log("Content-Encoding: ", req.get("Content-Encoding"));

  let fields;
  let conditions;
  const { error } = await loginV(req.body);
  if (error) res.status(400).json({ msg: error.details });

  // check for user email exists
  try {
    fields = ["*"];
    conditions = {};

    if (req.body.email) conditions.email = req.body.email;
    if (req.body.username) conditions.username = req.body.username;

    const user = await db.findOne("members", conditions, fields);
    const teams = await db.findAll(
      "team_member_pivot",
      { member_id: user.id },
      ["team_id", "role"]
    );
    console.log("member teams: ", teams);

    if (!user)
      return res.status(400).send({ msg: "Email or password is wrong !!" });

    // salt [hash password]
    const validPsw = await bcrypt.compare(req.body.password, user.password);
    if (!validPsw) return res.status(400).send("Email or password is wrong !!");

    //

    const now = moment().format("YYYY-MM-DD  HH:mm:ss.000");
    conditions = { id: user.id };
    fields = { active: true, last_login: now };
    db.updateOne("members", conditions, fields).then(resp => {
      console.log("members active & last_login updated");
      console.log(resp);
    });

    // create token
    const token = jwt.sign(
      {
        id: user.id, // needed for authentication
        teams // needed for authorization
        // we can also add userAgent
        // exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 day exp
      },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    res.header("Authorization", token);
    res.json({ token });
  } catch (err) {
    console.error(err);
  }
};

/**
 *
 */
exports.register = async (req, res) => {
  console.log("[POST] {api/v1/users/register}");

  const { error } = await registerV(req.body);

  if (error) return res.send(error.details[0].message).status(400);

  const fields = ["*"];
  const conditions = {
    email: req.body.email
  };
  // check for user uniqueness
  const emailExist = await db.findOne("members", conditions, fields);

  console.log("emailExist : ", emailExist);
  if (emailExist)
    return res.status(400).json({ msg: "Email is already exist" });

  // salt [hash password]
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  };

  try {
    const savedUser = await db.createOne("members", newUser);
    if (savedUser) {
      // user should have default project to store tasks
      const defaultProj = {
        owner_id: savedUser.id,
        team_id: null,
        title: "Default project",
        status: "created",
        cover_img: "some_default_url"
      };
      // every user have at least one default project
      // do not block response
      db.createOne("projects", defaultProj).then(defProject => {
        if (defProject) {
          console.log(
            `default project for user ${defProject.owner_id} created`
          );
        }
      });
      // we should also insert row into project_member_pivot with appropiate role

      return res.status(201).json({
        msg: `user ${savedUser.username} created successfully`
      });
    }

    res.status(400).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Expose-Headers
 */
exports.refreshToken = (req, res) => {};

/**
 *
 */
exports.logout = async (req, res) => {
  console.log("[POST] {api/v1/users/verify}");
  const conditions = {
    id: req.user.id
  };

  try {
    const updatedUser = await db.updateOne("members", conditions, {
      active: false
    });

    if (updatedUser) return res.json({ msg: "User logged out" });
    res.status(400).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 *
 */
exports.verify = async (req, res) => {
  console.log("[POST] {api/v1/users/verify}");
  const conditions = {};

  if (req.body.email) conditions.email = req.body.email;
  if (req.body.username) conditions.username = req.body.username;

  try {
    const updatedUser = await db.updateOne("members", conditions, {
      verified: true
    });
    console.log("---> ", updatedUser);
    if (updatedUser) return res.json({ msg: "User verified" });
    res.status(400).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.passwordReset = async (req, res) => {
  console.log("[POST] {api/v1/users/password-reset}");
};
