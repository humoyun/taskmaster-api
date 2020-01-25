const db = require("../db");
const uuid = require("node-uuid");
const Utils = require("../utils/Utils");

const fields = ["*"];
/**
 *
 */
exports.getTasks = async (req, res) => {
  console.log("[GET] {api/v1/tasks}");

  const conditions = { owner_id: req.user.id };

  try {
    const teams = await db.findAll("tasks", conditions, fields);
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
  console.log("[GET] {api/v1/tasks/:id}");
  const teamId = req.params.id;
  console.log("member id: ", teamId);

  try {
    const conditions = { id: teamId };
    const teams = await db.findOne("tasks", conditions, fields);
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
 */
exports.createTask = async (req, res) => {
  try {
    console.log("[POST] {api/v1/tasks}");
    const fields = {
      id: uuid.v4(),
      subject: req.body.subject,
      project_id: req.body.projectId,
      description: req.body.description,
      info: req.body.info
    };
    // check if project and req.user actually belongs to this team
    // if (req.query.teamId) fields.team_id = req.query.teamId;

    console.log("task fields: ", fields);

    const task = await db.createOne("tasks", fields);
    console.log("/----------------------------------/");
    console.log(task);
    console.log("/----------------------------------/");
    if (task) {
      console.log("projects retrieved successfully");
      return res.json(task);
    }
    res.status(400).json({ msg: "some params missing" });
  } catch (err) {
    if (err.code === "23505")
      return res
        .status(400)
        .json({ msg: "Task with this subject already exist" });
    console.error(err);
    return res.status(500).send({ msg: "Server Error" });
  }
};

/**
 *
 */
exports.updateTask = async (req, res) => {
  try {
    console.log("[PUT] {api/v1/tasks/:id}");
    const fields = {
      title: req.body.title,
      project_id: req.body.projectId,
      description: req.body.description,
      info: req.body.info
    };

    console.log("team: ", fields);

    const result = await db.create("tasks", fields);
    console.log("/----------------------------------/");
    console.log(result);
    console.log("/----------------------------------/");
    if (result) {
      console.log("tasks retrieved successfully");
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
  console.log("[DELETE] {api/v1/tasks/:id}");
  try {
    const id = req.params.id;
    const owner_id = req.user.id;
    const conditions = { id, owner_id };
    console.log("member id: ", conditions);

    const result = await db.deleteOne("tasks", conditions, ["*"]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

exports.bulkDeleteTasks = async (req, res) => {
  console.log("[BULK_DELETE] {api/v1/tasks}");
  const idsArr = req.body.ids;

  try {
    const teamIdsArray = req.body.ids;
    const conditions = { id: req.user.id };
    console.log("member id: ", teamId);
    const result = await db.deleteOne("tasks", fields);
  } catch (err) {}
};
