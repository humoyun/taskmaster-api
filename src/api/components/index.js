exports.bcryptCheck = async (password, hashedPsw) => {
  return await new Promise(resolve =>
    bcrypt.compare(password, hashedPsw, (err, res) => {
      if (err) {
        return resolve(false);
      }
      return resolve(res);
    })
  );
};

exports.patchById = async (req, res) => {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.password = salt + "$" + hash;
  }
  UserModel.patchUser(req.params.userId, req.body).then(result => {
    res.status(204).send({});
  });
};
