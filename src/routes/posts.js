const router = require("express").Router();
const verify = require("../utils/token_verify.js");

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
    },
    {
      id: "post_6",
      post: "private resource"
    },
    {
      id: "post_87",
      post: "private resource two"
    },
    {
      id: "post_32",
      post: "private resource three"
    }
  ]);
});

module.exports = router;