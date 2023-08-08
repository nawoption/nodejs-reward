const { Schema, model } = require("mongoose");
const promotionSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  expireDate: { type: Date, default: Date.now },
});
const Promotion = model("promotion", promotionSchema);
module.exports = Promotion;
