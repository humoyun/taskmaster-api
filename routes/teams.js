const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(201).send({ msg: "team created" });
});

router.post("/", (req, res) => {
  res.status(201).send({ msg: "team created" });
});

router.put("/:id", (req, res) => {
  res.status(201).send({ msg: "team created" });
});

router.delete("/:id", (req, res) => {
  res.status(201).send({ msg: "team created" });
});

/**
 * 
 */
router.get("/:id/members", (req, res) => {
  res.status(201).send({ msg: "team created" });
});

/**
 * 
 */
router.get("/:id/members/:id", (req, res) => {
  res.status(201).send({ msg: "team created" });
});

module.exports = router;
