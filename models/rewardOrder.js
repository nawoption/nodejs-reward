const { Schema, model } = require("mongoose");
const rewardOrderSchema = Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  reward: { type: Schema.Types.ObjectId, required: true, ref: "reward" },
  status: { type: String, enum: ["pending", "received"], default: "pending" },
  created: { type: Date, default: Date.now },
});
const RewardOrder = model("rewardOrder", rewardOrderSchema);
module.exports = RewardOrder;
