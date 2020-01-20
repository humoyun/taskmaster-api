const db = require("../db");
const uuid = require("node-uuid");
/**
 *
 */
exports.getAllTeams = async (req, res) => {
  console.log("[api/teams/(all)]");
  const fields = undefined;
  try {
    const teams = await db.findAll("teams", fields);
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
 *
 */
exports.getTeamById = async (req, res) => {
  console.log("[api/teams/:id]");
  const fields = undefined;
  const teamId = req.params.id;
  console.log("member id: ", teamId);

  try {
    const teams = await db.findOneById("teams", teamId, fields);
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
 *
 */
exports.createTeam = async (req, res) => {
  try {
    console.log("[POST]:[api/teams]");
    const fields = {
      id: uuid.v4(),
      name: req.body.name,
      admin_id: req.body.adminId,
      description: req.body.description,
      info: req.body.info
    };

    console.log("team: ", fields);

    const teams = await db.create("teams", fields);
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
 *
 */
exports.updateTeam = async (req, res) => {};
