const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true, min: 6, max: 256 },
  user: { type: String, required: true, min: 6, max: 256 },
  entity: { type: String, required: true, min: 5, max: 256 },
  action: { type: String, required: true, min: 6, max: 256 },
  date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Activity", activitySchema);
