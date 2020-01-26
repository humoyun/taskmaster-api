const jwt = require("jsonwebtoken");
const fs = require("fs");

class Token {
  constructor() {
    this.tokens = {};
    this.accessToken = null;
    this.refreshToken = null;
    this.creationTime = null;
    this.expirationTime = null;
    this.userId = null;
  }

  /**
   * data: userId
   * expiresIn: 24h
   */
  verify(data, expiresIn) {
    if (this.tokens[data]) {
      console.log(`[ user (${data}) already signed ]`);
    }
    // create token
    const token = jwt.sign(
      {
        id: data
        // exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1 day exp
      },
      process.env.TOKEN_SECRET,
      { expiresIn }
    );

    this.userid = data;
    this.expireTime = expiresIn;
    this.createdTime = new Date().toISOString();

    return token;
  }

  /**
   *
   */
  decode() {}

  /**
   *
   */
  create() {}

  /**
   *
   */
  static instance() {
    return new Token();
  }
}

module.exports = Token.instance();

// temporal solution for add helper funcitons in mongooose model(not instance)
model.createToken = (data, cert, expiresIn) => {
  const options = { algorithm: "RS256", issuer: "api" };
  if (expiresIn !== null && !Number.isNaN(expiresIn)) {
    options.expiresIn = expiresIn;
  }

  return jwt.sign(data, cert, options);
};

model.verifyToken = (token, cert) => jwt.verify(token, cert);
model.decodeToken = token => jwt.decode(token);
model.keyDirectory = `${__dirname}/../../keys`;
console.log("model.keyDirectory: ", model.keyDirectory);

model.getPrivateKey = () => {
  const privateKeyFile = `${model.keyDirectory}/private.pem`;
  let privateKey;
  // Check file exists locally
  if (!fs.existsSync(privateKeyFile)) {
    console.log("key file not exist");
    throw new ApiError(401, "UNAUTHORIZED");
  } else {
    privateKey = fs.readFileSync(privateKeyFile);
  }
  return privateKey;
};

model.getPublicKey = () => {
  let publicKeyFile = `${model.keyDirectory}/${process.env.NODE_ENV}-public.pem`;
  if (isLocal()) {
    publicKeyFile = `${model.keyDirectory}/dev-public.pem`;
  }
  let publicKey;
  // Check file exists locally
  if (!fs.existsSync(publicKeyFile)) {
    console.log("key file not exist");
    throw new ApiError(401, "UNAUTHORIZED");
  } else {
    publicKey = fs.readFileSync(publicKeyFile);
  }
  return publicKey;
};

module.exports = model;
