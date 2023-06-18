const { Schema, model } = require("mongoose");
const promotionSchema = Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  startDate: { type: String, required: true },
  expireDate: { type: String, required: true },
});
const Promotion = model("promotion", promotionSchema);
module.exports = Promotion;
