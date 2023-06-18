const { Schema, model } = require("mongoose");
const roleSchema = Schema({
  name: { type: String, required: true, unique: true },
});
const Role = model("role", roleSchema);
module.exports = Role;
