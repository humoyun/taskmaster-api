const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 6, max: 256 },
  email: { type: String, required: true, min: 5, max: 256 },
  password: { type: String, required: true, min: 6, max: 256 },
  date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("User", userSchema);
