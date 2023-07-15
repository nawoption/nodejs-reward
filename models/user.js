const { model, Schema } = require("mongoose");

const userSchema = Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, optional:true,default:''},
  password: { type: String, required: true },
  address: { type: String, required: true },
  points: { type: Number, default: 0 },
  role: { type: Schema.Types.ObjectId, ref: "role" },
  created: { type: Date, default: Date.now },
});
const User = model("user", userSchema);
module.exports = User;
