const db = require("@src/db");
const uuid = require("node-uuid");
const Utils = require("@src/utils/Utils");

const fields = ["*"];
/**
 *
 */
exports.getComments = async (req, res) => {
  console.log("[GET] {api/v1/tasks}");

  const conditions = {};

  try {
    const tasks = await db.findAll("tasks", conditions, fields);
    if (tasks) {
      console.log("tasks retrieved successfully");
      res.json(tasks);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server Error" });
  }
};

/**
 *
 */
exports.getComment = async (req, res) => {
  console.log("[GET] {api/v1/tasks/:id}");
  const taskId = req.params.id;
  console.log("task id: ", taskId);

  try {
    const conditions = { id: taskId };
    const task = await db.findOne("tasks", conditions, fields);
    if (task) {
      console.log("task retrieved successfully");
      return res.json(task);
    }
    res.status(404).json({ msg: "Task not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
};

/**
 * we need either teamid or userId
 * check for error cases postgres
 * https://www.postgresql.org/docs/9.2/errcodes-appendix.html
 * code: 23505 => unique_violation
 */
exports.createComment = async (req, res) => {
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

    const task = await db.createOne("tasks", fields);

    if (task) {
      console.log("task created successfully");
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
exports.updateComment = async (req, res) => {
  try {
    console.log("[PUT] {api/v1/tasks/:id}");
    const fields = {
      title: req.body.title,
      project_id: req.body.projectId,
      description: req.body.description,
      info: req.body.info
    };

    const updatedTask = await db.create("tasks", fields);

    if (updatedTask) {
      console.log("tasks retrieved successfully");
      return res.status(200).json(updatedTask);
    }
    res.status(400).json({ msg: "" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ msg: "server error" });
  }
};

/**
 *
 */
exports.deleteComment = async (req, res) => {
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

exports.bulkDeleteComme;
nts = async (req, res) => {
  console.log("[BULK_DELETE] {api/v1/tasks}");
  const idsArr = req.body.ids;

  try {
    const teamIdsArray = req.body.ids;
    const conditions = { id: req.user.id };
    console.log("member id: ", teamId);
    const result = await db.deleteOne("tasks", fields);
  } catch (err) {}
};
