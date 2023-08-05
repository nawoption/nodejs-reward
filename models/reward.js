const { Schema, model } = require("mongoose");
const rewardSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  points: { type: Number, required: true },
  created: { type: Date, default: Date.now },
});
const Reward = model("reward", rewardSchema);
module.exports = Reward;
