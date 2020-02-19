const db = require("@src/db");
const uuid = require("node-uuid");
// TODO I have to write resolver to resolve path easily : reolvePath('@/utils/Utils')
const Utils = require("@src/utils/Utils");

const fields = ["*"];
/**
 *
 */
exports.getProjects = async (req, res) => {
  console.log("[GET] {api/v1/projects}");

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
 * 1. check whether project exists with this id
 * 2. get role of member for this project [owner, admin, member]
 *    project_id, team_id, member_id = currently logged in user
 * 3.
 *
 * select p.id, p.title, p.team_id, pivot.team_id, pivot.member_id, pivot.role from projects p
 * left join team_member_pivot pivot on p.team_id = pivot.team_id where pivot.member_id = sess.user.id  AND p.id = project_id;
 *
 * table1 = ('table_name', 'fields', conditions)
 * table2 = ('table_name', 'fields', conditions)
 *
 * findByJoin(type{left,right,inner,outer}, table1, table2)
 *
 */
exports.getProject = async (req, res) => {
  console.log("[GET] {api/v1/projects/:id}");
  const id = req.params.id; // user supplied
  const teamId = req.body.teamId; // user supplied
  const memberId = req.user.id; // from session data
  console.log("member id: ", teamId);

  // join table project on pivot_member_team on project.team_id === team.id

  try {
    const joinCond = { team_id: teamId };
    const project = { table: "projects", fields: ["*"], conds: { id } };
    const teamMemberPivot = {
      table: "team_member_pivot",
      fields: ["role"],
      conds: {
        member_id: memberId
      }
    };

    const resp = await db.findByJoin([project, teamMemberPivot], joinCond);
    if (resp) {
      console.log("teams retrieved successfully");
      //  maybe can be handled in authorization,
      // if (project.owner_id !== memberId)
      //   return res.status(401).json({ msg: "Unauthorized" });
      return res.json(resp);
    }
    res.status(404).json({ msg: "not found" });
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

exports.getProjectTasks = (req, res) => {
  console.log("[POST] {api/v1/projects/:id/tasks}");
};

exports.getProjectComments = (req, res) => {
  console.log("[POST] {api/v1/projects/:id/tasks}");
};

exports.createProject = async (req, res) => {
  try {
    console.log("[POST] {api/v1/projects}");

    const fields = {
      id: uuid.v4(),
      team_id: req.query.teamId, // from query params
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
    console.log("[PUT] {api/v1/projects}");
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

    const project = await db.updateOne("projects", conditions, fields);
    if (project) {
      console.log("project updated successfully");
      return res.json(project);
    }
    res.status(404).json({ msg: "not found" });
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
  console.log("[DELETE] {api/v1/projects/:id}");
  try {
    const id = req.params.id;
    const owner_id = req.user.id;
    const conditions = { id, owner_id };
    // if (req.body.teamId) conditions.team_id = req.body.teamId;

    const project = await db.deleteOne("projects", conditions, ["*"]);
    if (project) {
      return res.json(project);
    }
    res.status(404).json({ msg: "not found" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

/**
 *
 */
exports.bulkDeleteProjects = async (req, res) => {
  console.log("[BULK_DELETE] api/v1/projects");
  const idsArr = req.body.ids;

  try {
    const teamIdsArray = req.body.ids;
    const conditions = { id: req.user.id };
    console.log("member id: ", teamId);
    const result = await db.deleteOne("projects", fields);
  } catch (err) {}
};
