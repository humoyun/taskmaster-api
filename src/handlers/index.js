async function bcryptCheck(password, hash) {
  return await new Promise(resolve =>
    bcrypt.compare(password, hash, (err, res) => {
      if (err) {
        return resolve(false);
      }
      return resolve(res);
    })
  );
}
