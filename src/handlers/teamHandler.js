const db = require("../db");
const uuid = require("node-uuid");

const fields = ["*"];
/**
 *
 */
exports.getAllTeams = async (req, res) => {
  console.log("[api/teams/(all)]");

  const conditions = { owner_id: req.user.id };

  try {
    const teams = await db.findAll("teams2", conditions, fields);
    if (teams) {
      console.log("teams retrieved successfully", teams);
      res.status(200).send(teams);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server Error" });
  }
};

/**
 *
 */
exports.getTeamById = async (req, res) => {
  console.log("[api/teams/:id]");
  const teamId = req.params.id;
  console.log("member id: ", teamId);

  try {
    const conditions = { id: teamId };
    const teams = await db.findOne("teams", conditions, fields);
    if (teams) {
      console.log("teams retrieved successfully");
      return res.status(201).send(teams);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: "db error" });
  }
};

/**
 * check for error cases postgres
 * https://www.postgresql.org/docs/9.2/errcodes-appendix.html
 * code: 23505 => unique_violation
 *
 *
 */
exports.createTeam = async (req, res) => {
  try {
    console.log("[POST]:[api/teams]");
    const fields = {
      id: uuid.v4(),
      name: req.body.name,
      owner_id: req.body.ownerId,
      description: req.body.description,
      info: req.body.info
    };

    console.log("team: ", fields);

    const result = await db.create("teams", fields);
    console.log("/----------------------------------/");
    console.log(result);
    console.log("/----------------------------------/");
    if (result) {
      console.log("teams retrieved successfully");
      return res.status(201).json(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: "server error" });
  }
};

/**
 *
 */
exports.deleteTeam = async (req, res) => {
  console.log("[api/teams/:id]");
  try {
    const teamId = req.params.id;
    console.log("member id: ", teamId);
  } catch (err) {}
};
/**
 *
 */
exports.updateTeam = async (req, res) => {};
