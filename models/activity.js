const { Schema, model } = require("mongoose");

const activitySchema = Schema({
  points: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "user",required:true },
  status:{type:Boolean,required:true},
  created: { type: Date, default: Date.now },
});

const Activity = model("activity", activitySchema);
module.exports = Activity;
