const router = require("express").Router();

router.post("/create", (req, res) => {
  res.status(201).send({ msg: "project created" });
});

module.exports = router;

// INSERT INTO projects(owner_id, title, status, info, tags) VALUES (1002, 'TypeScriupt Dev', 'opened', '{"industry":"IT"}', '{"JS", "extention"}');
