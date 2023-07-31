const DB = require("../models/promotion");
const Helper = require("../utils/helper");

const add = async (req, res, next) => {
  const result = await new DB(req.body).save();
  Helper.fMsg(res, "Post Saved!", result);
};
const all = async (req, res, next) => {
  const results = await DB.find().sort({ _id: -1 });
  Helper.fMsg(res, "All promotion items", results);
};
const patch = async (req, res, next) => {
  const dbResult = await DB.findById(req.params.id);
  if (dbResult) {
    await DB.findByIdAndUpdate(dbResult._id, req.body);
    Helper.fMsg(res, "Data Updated");
  } else next(new Error("No post with that Id"));
};
const drop = async (req, res, next) => {
  const dbResult = await DB.findById(req.params.id);
  if (dbResult) {
    await DB.findByIdAndDelete(dbResult._id);
    Helper.fMsg(res, "Data Deleted");
  } else next(new Error("No post with that Id"));
};
module.exports = {
  add,
  all,
  patch,
  drop,
};
