const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", {
    someVar: "some var for template engine"
  });
});

module.exports = router;
