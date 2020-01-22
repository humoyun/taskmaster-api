const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("Authorization");
  console.log("[auth] token: ", token);
  if (!token) return res.send("Access Denied").status(401);

  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("auth: ", verifiedUser);
    req.user = verifiedUser;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
