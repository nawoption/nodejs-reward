const DB = require("../models/rewardOrder");
const userDB = require("../models/user");
const rewardDB = require("../models/reward");
const activityDB = require("../models/activity");
const Helper = require("../utils/helper");

const loginedUser = async (req, res, next) => {
  let dbResults = await DB.find({ user: req.user._id }).populate("user reward");
  Helper.fMsg(res, "All reward orders", dbResults);
};
const filterUser = async (req, res, next) => {
  let dbResults = await DB.find({ user: req.body.userId }).populate(
    "user reward"
  );
  Helper.fMsg(res, "All reward orders", dbResults);
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
module.exports = {
  loginedUser,
  filterUser,
  add,
};