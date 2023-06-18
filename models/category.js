const { model, Schema } = require("mongoose");

const categorySchema = Schema({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  created: { type: Date, default: Date.now },
});
const Category = model("category", categorySchema);
module.exports = Category;
