const DB = require("../models/user");
const activityDB = require("../models/activity");
const Helper = require("../utils/helper");

const register = async (req, res, next) => {
  let dbResult = await DB.findOne({ phone: req.body.phone });
  if (dbResult) {
    next(new Error("Phone number is already in use!"));
  } else {
    req.body["password"] = Helper.encode(req.body.password);
    const result = await new DB(req.body).save();
    Helper.fMsg(res, "Register success", result);
  }
};

const login = async (req, res, next) => {
  const dbResult = await DB.findOne({ phone: req.body.phone }).populate(
    "roles"
  );
  if (dbResult) {
    if (Helper.checkPassword(req.body.password, dbResult.password)) {
      let user = dbResult.toJSON();
      delete user.password;
      user.token = Helper.makeToken(user);
      Helper.fMsg(res, "Login scuuess", user);
    } else {
      next(new Error("Crediential error"));
    }
  } else {
    next(new Error("Crediential error"));
  }
};

const addPoints = async (req, res, next) => {
  const dbResult = await DB.findById(req.body.userId).select("_id points");
  if (dbResult) {
    let totalPoints = dbResult.points + req.body.points;
    await DB.findByIdAndUpdate(dbResult._id, { points: totalPoints });
    const result = await DB.findById(req.body.userId).select("_id points");
    const obj = {
      userId: req.user._id,
      points: req.body.points,
      status: true,
    };
    const activityResult = await new activityDB(obj).save();
    Helper.fMsg(res, "add points", result);
  }
};
const removePoints = async (req, res, next) => {
  const dbResult = await DB.findById(req.body.userId).select("_id points");
  if (dbResult) {
    let totalPoints = dbResult.points - req.body.points;
    await DB.findByIdAndUpdate(dbResult._id, { points: totalPoints });
    const result = await DB.findById(req.body.userId).select("_id points");
    const obj = {
      userId: req.user._id,
      points: req.body.points,
      status: false,
    };
    const activityResult = await new activityDB(obj).save();
    Helper.fMsg(res, "add points", result);
  }
};
const getUserByPhone = async (req, res, next) => {
  const result = await DB.findOne({ phone: req.params.ph }).populate("roles").select("-password");
  if (result) {
    Helper.fMsg(res, "Single use", result);
  } else next(new Error("No user with that phone number"));
};
module.exports = {
  register,
  login,
  addPoints,
  removePoints,
  getUserByPhone
};
