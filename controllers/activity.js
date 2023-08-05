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
const getToday = async (req, res, next) => {
  try {
    const desiredDate = new Date(req.params.desiredDate);
    desiredDate.setHours(0, 0, 0, 0);
    // Create a new date object for the next day (end of the day)
    const nextDay = new Date(desiredDate);
    nextDay.setDate(nextDay.getDate() + 1);
    let pipeline = [
      {
        $match: {
          // transactionType: "Earn Points", // Only consider transactions of type 'Earn Points'
          created: { $gte: desiredDate, $lt: nextDay }, // Filter transactions for today or after
        },
      },
      {
        $group: {
          _id: "$transactionType",
          totalPoints: { $sum: "$points" }, // Calculate the sum of points earned today
        },
      },
    ];
    const result = await activityDB.aggregate(pipeline);

    const earnedPoints =
      result.find((item) => item._id === "Earn Points")?.totalPoints || 0;
    const redeemPoints =
      result.find((item) => item._id === "Redemption")?.totalPoints || 0;

    Helper.fMsg(res, "Earned and Redeem Points:", {
      earnedPoints,
      redeemPoints,
    });
  } catch (err) {
    console.error("Error fetching today's activity:", err);
  }
};
const getTransaction = async (req, res, next) => {
  try {
    const desiredDate = new Date(req.params.desiredDate);
    desiredDate.setHours(0, 0, 0, 0);
    // Create a new date object for the next day (end of the day)
    const nextDay = new Date(desiredDate);
    nextDay.setDate(nextDay.getDate() + 1);
    let pipeline = [
      {
        $match: {
          // transactionType: "Earn Points", // Only consider transactions of type 'Earn Points'
          created: { $gte: desiredDate }, // Filter transactions for today or after
        },
      },
    ];
    const result = await activityDB.aggregate(pipeline);
    Helper.fMsg(res, "Transaction History", result);
  } catch (err) {
    console.error("Error fetching today's activity:", err);
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
  addPoints,
  getToday,
  getTransaction,
};
