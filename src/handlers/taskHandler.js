const db = require("../db");
const uuid = require("node-uuid");

const fields = ["*"];
/**
 *
 */
exports.getTask = async (req, res) => {
  console.log("[v1/tasks/(all)]");

  const conditions = { owner_id: req.user.id };

  try {
    const teams = await db.findAll("projects", conditions, fields);
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
exports.getTask = async (req, res) => {
  console.log("[GET] v1/tasks/:id");
  const teamId = req.params.id;
  console.log("member id: ", teamId);

  try {
    const conditions = { id: teamId };
    const teams = await db.findOne("projects", conditions, fields);
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
exports.createTask = async (req, res) => {
  try {
    console.log("[POST]:[api/v1/projects]");
    const fields = {
      id: uuid.v4(),
      title: req.body.title,
      team_id: req.body.id,
      tags: ["tag_1", "tag_2"],
      // due_at:
      description: req.body.description,
      info: req.body.info
    };

    console.log("team: ", fields);

    const result = await db.create("projects", fields);
    console.log("/----------------------------------/");
    console.log(result);
    console.log("/----------------------------------/");
    if (result) {
      console.log("projects retrieved successfully");
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
exports.updateTask = async (req, res) => {
  try {
    console.log("[PUT]:[v1/projects]");
    const fields = {
      title: req.body.title,
      project_id: req.body.ownerId,
      description: req.body.description,
      info: req.body.info
    };

    console.log("team: ", fields);

    const result = await db.create("projects", fields);
    console.log("/----------------------------------/");
    console.log(result);
    console.log("/----------------------------------/");
    if (result) {
      console.log("projects retrieved successfully");
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
exports.deleteTask = async (req, res) => {
  console.log("[delete] api/projects/:id");
  try {
    const id = req.params.id;
    const owner_id = req.user.id;
    const conditions = { id, owner_id };
    console.log("member id: ", conditions);

    const result = await db.deleteOne("projects", conditions, ["*"]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.bulkDeleteTasks = async (req, res) => {
  console.log("[api/projects]");
  const idsArr = req.body.ids;

  try {
    const teamIdsArray = req.body.ids;
    const conditions = { id: req.user.id };
    console.log("member id: ", teamId);
    const result = await db.deleteOne("projects", fields);
  } catch (err) {}
};
