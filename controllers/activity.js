const DB = require("../models/activity");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  const results = await DB.find({ userId: req.user._id });
  Helper.fMsg(res, "All user items", results);
};
const drop = async (req, res, next) => {
  const dbResult = await DB.findById(req.params.id);
  if (dbResult) {
    await DB.findByIdAndDelete(dbResult._id);
    Helper.fMsg(res, "Data Deleted");
  }
};
module.exports = {
  all,
  drop,
};
