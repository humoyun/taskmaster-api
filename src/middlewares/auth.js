const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("Authorization");
  console.log("[auth] token: ", token);

  if (!token) return res.status(401).json({ msg: "Access Denied" });

  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("auth: ", verifiedUser);
    req.user = verifiedUser;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(401).json({ msg: "Token expired" });
    res.status(401).json({ msg: "Invalid token" });
  }
};
