const db = require("../db");
const uuid = require("node-uuid");
const Utils = require("../utils/Utils");

const fields = ["*"];
/**
 *
 */
exports.getProjects = async (req, res) => {
  console.log("[v1/projects/(all)]");

  const conditions = { owner_id: req.user.id };

  try {
    const projects = await db.findAll("projects", conditions, fields);
    if (projects) {
      console.log("projects retrieved successfully", projects);
      res.json(projects);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: "Server Error" });
  }
};

/**
 *
 */
exports.getProject = async (req, res) => {
  console.log("[api/teams/:id]");
  const teamId = req.params.id;
  console.log("member id: ", teamId);

  try {
    const conditions = { id: teamId };
    const project = await db.findOne("projects", conditions, fields);
    if (project) {
      console.log("teams retrieved successfully");
      return res.status(201).json(project);
    }
    res.status(404).json(project);
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
// {
//   "title": "Postman",
//   "status": "ongoing",
//   "description": "project description is not completed",
//   "starred": false,
//   "info": {
//   	"industry": "Software Developement"
//   },
//   "tags": ["backend", "api", "node"]
// }

exports.createProject = async (req, res) => {
  try {
    console.log("[POST]:[api/projects]");

    const fields = {
      id: uuid.v4(),
      team_id: req.query.teamId,
      owner_id: req.user.id,
      title: req.body.title,
      starred: req.body.starred,
      status: req.body.status,
      tags: req.body.tags,
      description: req.body.description,
      info: req.body.info
    };

    console.log("team: ", fields);

    const project = await db.createOne("projects", fields);
    console.log("/----------------------------------/");
    console.log(project);
    console.log("/----------------------------------/");
    if (project) {
      console.log("project retrieved successfully");
      res.status(201).json(project);
    }
  } catch (err) {
    console.error(err);
    if (err.code === "23505")
      return res
        .status(400)
        .json({ msg: "Project with this name already exist" });

    res.status(500).json({ msg: "Server Error" });
  }
};

/**
 * check for error cases postgres
 * https://www.postgresql.org/docs/9.2/errcodes-appendix.html
 * code: 23505 => unique_violation
 *
 *
 */
exports.updateProject = async (req, res) => {
  try {
    console.log("[PUT]:[api/projects]");
    const tmp = {
      team_id: req.body.teamId,
      title: req.body.title,
      starred: req.body.starred,
      status: req.body.status,
      tags: req.body.tags,
      description: req.body.description,
      info: req.body.info
    };

    const fields = Utils.getNonNullValuesFromObject(tmp);

    const conditions = {
      id: req.params.id,
      owner_id: req.user.id
    };

    console.log("team: ", conditions, fields);

    const project = await db.updateOne("projects", conditions, fields);
    console.log("/----------------------------------/");
    console.log(project);
    console.log("/----------------------------------/");
    if (project) {
      console.log("project retrieved successfully");
      res.status(201).json(project);
    }
  } catch (err) {
    console.error(err);
    if (err.code === "23505")
      return res
        .status(400)
        .json({ msg: "Project with this name already exist" });

    res.status(500).json({ msg: "Server Error" });
  }
};

/**
 *
 */
exports.deleteProject = async (req, res) => {
  console.log("[delete] api/projects/:id");
  try {
    const id = req.params.id;
    const owner_id = req.user.id;
    const team_id = req.body.teamId;
    const conditions = { id, owner_id };
    if (team_id) conditions.team_id = team_id;

    console.log("conditions: ", conditions);

    const project = await db.deleteOne("projects", conditions, ["*"]);
    if (project) {
      return res.json(project);
    }
    res.status(404).json({ msg: "not found" });
  } catch (err) {
    res.status(500).json({ msg: "server error" });
  }
};

/**
 *
 */
exports.bulkDeleteProjects = async (req, res) => {
  console.log("[api/projects]");
  const idsArr = req.body.ids;

  try {
    const teamIdsArray = req.body.ids;
    const conditions = { id: req.user.id };
    console.log("member id: ", teamId);
    const result = await db.deleteOne("projects", fields);
  } catch (err) {}
};
