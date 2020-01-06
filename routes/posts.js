const router = require("express").Router();
const verify = require("../lib/token_verify.js");

router.get("/", verify, (req, res) => {
  res.json([
    {
      id: "post_1",
      post: "private resource"
    },
    {
      id: "post_2",
      post: "private resource two"
    },
    {
      id: "post_3",
      post: "private resource three"
    }
  ]);
});

module.exports = router;
