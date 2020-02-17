const db = require("../../../db");
const uuid = require("node-uuid");

const fields = ["*"];
/**
 *
 */
exports.getTeams = async (req, res) => {
  console.log("[api/teams/(all)]");

  const conditions = { owner_id: req.user.id };

  try {
    const teams = await db.findAll("teams", conditions, fields);
    if (teams) {
      console.log("teams retrieved successfully", teams);
      res.json(teams);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server Error" });
  }
};

/**
 * possible errors:
 * 1. err code: 22P02 `INVALID TEXT REPRESENTATION` [invalid input syntax for type uuid]
 *
 */
exports.getTeam = async (req, res) => {
  console.log("[api/teams/:id]");
  const teamId = req.params.id;
  console.log("member id: ", teamId);

  try {
    const conditions = { id: teamId };
    const team = await db.findOne("teams", conditions, fields);
    if (team) {
      console.log("teams retrieved successfully");
      return res.json(team);
    }
    res.status(404).json({ msg: "Team not found" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server error" });
  }
};

exports.getTeamProjects = (req, res) => {
  console.log("[POST] {api/v1/team/:id/projects}");
  res.json(["project_1", "project_2", "project_3"]);
};

exports.getTeamMembers = (req, res) => {
  console.log("[POST] {api/v1/teams/:id/members}");
  res.json(["member1", "member_2", "member_3"]);
};

/**
 * check for error cases postgres
 * https://www.postgresql.org/docs/9.2/errcodes-appendix.html
 * code: 23505 `UNIQUE VIOLATION` [duplicate key value violates unique constraint]
 *
 *
 */
exports.createTeam = async (req, res) => {
  try {
    console.log("[POST]:[api/teams]");
    const fields = {
      id: uuid.v4(),
      name: req.body.name,
      owner_id: req.user.id,
      description: req.body.description,
      info: req.body.info
    };

    console.log("team: ", fields);

    const team = await db.createOne("teams", fields);

    if (team) {
      console.log(`team ${team.name} created successfully`);
      return res.status(201).json(team);
    }
    res.status(404).json({ msg: "" });
  } catch (err) {
    console.error(err);
    if (err.code === "23505")
      return res.status(400).json({ msg: "Team with this name already exist" });
    res.status(500).send({ msg: "Server error" });
  }
};

/**
 *
 */
exports.updateTeam = async (req, res) => {
  try {
    console.log("[PUT]:[api/teams]");
    const fields = {
      name: req.body.name,
      description: req.body.description,
      info: req.body.info
    };
    const teamId = req.params.id;

    const conditions = { id: teamId };
    const team = await db.updateOne("teams", conditions, fields);

    if (team) {
      console.log(`team ${team.name} updated successfully`);
      return res.json(team);
    }
    res.status(404).json({ msg: "Bad request" });
  } catch (err) {
    console.error(err);
    if (err.code === "23505")
      return res.status(400).json({ msg: "Team with this name already exist" });
    res.status(500).send({ msg: "Server error" });
  }
};

/**
 * sysadmin can also add members
 */
exports.addMember2Team = async (req, res) => {
  console.log("[PUT] {api/v1/teams/:id} ");
  const teamId = req.params.id;
  const memberId = req.body.memberId;
  const role = req.body.role;

  try {
    const conditions = { team_id: teamId, member_id: memberId, role };
    const dataBack = ["id", "username", "email"];

    const member = await db.addOne("team_member_pivot", conditions, dataBack);

    if (!member)
      return res.status(404).json({ msg: "User not found by this id" });
    else res.send(member);
  } catch (err) {
    console.error(err);
  }
};

/**
 * by email
 */
exports.inviteMemberToTeam = async (req, res) => {};
/**
 *
 */
exports.removeMemberFromTeam = (req, res) => {};

/****************************************************************************************/

/**
 *
 */
exports.deleteTeam = async (req, res) => {
  console.log("[delete] api/teams/:id");
  try {
    const id = req.params.id;
    const owner_id = req.user.id;
    const conditions = { id, owner_id };
    console.log("member id: ", conditions);

    const deleted = await db.deleteOne("teams", conditions, ["*"]);
    if (deleted) return res.json(deleted);
    res.status(400).json({ msg: "something happenned in deleteTeam" });
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.deleteTeams = async (req, res) => {
  console.log("[api/teams]");
  try {
    const teamIdsArray = req.body.ids;
    const conditions = { id: req.user.id };
    console.log("member id: ", teamId);
    const result = await db.deleteOne("teams", fields);
  } catch (err) {}
};

/**
 * --------------------------------------------------------------------
 */
