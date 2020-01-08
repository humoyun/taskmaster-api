const router = require("express").Router();

router.post('/create', (req, res) => {
  res.status(201).send({ msg: 'project created' });
})

export default router;