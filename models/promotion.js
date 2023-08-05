const { Schema, model } = require("mongoose");
const promotionSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  startDate: { type: Date, default: null },
  expireDate: { type: Date, default: null },
});
const Promotion = model("promotion", promotionSchema);
module.exports = Promotion;
