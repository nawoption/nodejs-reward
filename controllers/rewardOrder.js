const DB = require("../models/rewardOrder");
const userDB = require("../models/user");
const rewardDB = require("../models/reward");
const activityDB = require("../models/activity");
const Helper = require("../utils/helper");

const loginedUser = async (req, res, next) => {
  let dbResults = await DB.find({ user: req.user._id }).populate("user reward");
  Helper.fMsg(res, "All reward orders", dbResults);
};
const filterPendingOrders = async (req, res, next) => {
  let dbResults = await DB.find({
    status: "pending",
  }).populate("user reward");
  Helper.fMsg(res, "All pending orders", dbResults);
};
const filterReceivedOrders = async (req, res, next) => {
  let dbResults = await DB.find({
    status: "received",
  }).populate("user reward");
  Helper.fMsg(res, "All received orders", dbResults);
};

const add = async (req, res, next) => {
  const dbResult = await userDB.findById(req.user._id).select("_id points");
  const dbReward = await rewardDB.findById(req.body.rewardId);
  if (dbResult && dbReward) {
    if (dbResult.points >= dbReward.points) {
      let totalPoints = dbResult.points - dbReward.points;
      await userDB.findByIdAndUpdate(dbResult._id, { points: totalPoints });
      const activityObj = {
        userId: req.user._id,
        points: dbReward.points,
        status: false,
      };
      const rewardObj = {
        user: dbResult._id,
        reward: dbReward._id,
      };
      await new activityDB(activityObj).save();
      await new DB(rewardObj).save();
      Helper.fMsg(res, "Reward Order Saved");
    } else next(new Error("Not enought points"));
  }
};
const update = async (req, res, next) => {
  await DB.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
  Helper.fMsg(res, "Reward Order Updated");
};
module.exports = {
  loginedUser,
  filterPendingOrders,
  filterReceivedOrders,
  add,
  update,
};
