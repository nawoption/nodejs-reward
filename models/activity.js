const { Schema, model } = require("mongoose");

const activitySchema = Schema({
  points: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "user",required:true },
  transactionType: { type: String, required: true, enum: ["Redemption", "Earn Points"] },
  created: { type: Date, default: Date.now },
});

const Activity = model("activity", activitySchema);
module.exports = Activity;
