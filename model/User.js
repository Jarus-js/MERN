const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, min: 5, max: 20 },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, min: 6, max: 20 },
  date: { type: Date, default: Date.now },
});

module.exports = model("user", userSchema);
