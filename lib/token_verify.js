const jwt = require("jsonwebtoken");

module.exports = function verify(req, res, next) {
  const token = req.header("auth-token");
  console.log(">>> ", token);
  if (!token) return res.send("Access Denied").status(401);

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
