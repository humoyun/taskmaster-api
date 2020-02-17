const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const role = req.user.role;
  console.log("[autz] token: ", role);
  if (!token) return res.send("Not Authorized").status(403);

  try {
    // check for authorization
    // req.user = verifiedUser;
    next();
  } catch (err) {
    res.status(500).send("Server error");
  }
};
