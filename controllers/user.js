const DB = require("../models/user");
const roleDB = require("../models/role");
const Helper = require("../utils/helper");

const register = async (req, res, next) => {
  let dbResult = await DB.findOne({ phone: req.body.phone });
  const userRole = await roleDB.findOne({ name: "user" });
  if (dbResult) {
    next(new Error("Phone number is already in use!"));
  } else {
    req.body["password"] = Helper.encode(req.body.password);
    req.body["role"] = userRole._id;
    const result = await new DB(req.body).save();
    Helper.fMsg(res, "Register success", result);
  }
};

const login = async (req, res, next) => {
  const dbResult = await DB.findOne({ phone: req.body.phone }).populate("role");
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

const getUserByPhone = async (req, res, next) => {
  const result = await DB.findOne({ phone: req.params.ph })
    .populate("role")
    .select("-password");
  if (result) {
    Helper.fMsg(res, "Single use", result);
  } else next(new Error("No user with that phone number"));
};
module.exports = {
  register,
  login,
  getUserByPhone,
};
