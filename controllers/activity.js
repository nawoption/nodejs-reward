const userDB = require("../models/user");
const Helper = require("../utils/helper");
const activityDB = require("../models/activity");

const loginedUser = async (req, res, next) => {
  const results = await activityDB
    .find({ userId: req.user._id })
    .sort({ created: -1 });
  Helper.fMsg(res, "Logined user records", results);
};
const filterUser = async (req, res, next) => {
  const results = await activityDB
    .find({ userId: req.params.id })
    .sort({ created: -1 });
  Helper.fMsg(res, "Single user record", results);
};
const addPoints = async (req, res, next) => {
  const dbResult = await userDB.findById(req.body.userId).select("_id points");
  if (dbResult) {
    let totalPoints = dbResult.points + req.body.points;
    await userDB.findByIdAndUpdate(dbResult._id, { points: totalPoints });
    const result = await userDB.findById(req.body.userId).select("_id points");
    const obj = {
      userId: req.body.userId,
      points: req.body.points,
      transactionType: "Earn Points",
    };
    await new activityDB(obj).save();
    Helper.fMsg(res, "Added points", result);
  }
};
const removePoints = async (req, res, next) => {
  const dbResult = await userDB.findById(req.body.userId).select("_id points");
  if (dbResult) {
    if (dbResult.points >= req.body.points) {
      let totalPoints = dbResult.points - req.body.points;
      await userDB.findByIdAndUpdate(dbResult._id, { points: totalPoints });
      Helper.fMsg(res, "removed points");
    } else next(new Error("Not enought points"));
  }
};
const drop = async (req, res, next) => {
  const dbResult = await DB.findById(req.params.id);
  if (dbResult) {
    await DB.findByIdAndDelete(dbResult._id);
    Helper.fMsg(res, "Data Deleted");
  }
};
module.exports = {
  filterUser,
  loginedUser,
  drop,
  addPoints,
  removePoints,
};
