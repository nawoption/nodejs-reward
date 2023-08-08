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
    let user = result.toJSON();
    delete user.password;
    Helper.fMsg(res, "Register success, please login", user);
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
    Helper.fMsg(res, "User exists", result);
  } else next(new Error("No user with that phone number"));
};
const getEmployee = async (req, res, next) => {
  const dbEmployee = await roleDB.findOne({ name: "employee" });
  const result = await DB.find({ role: dbEmployee._id });
  Helper.fMsg(res, "Employess", result);
};
const getCount = async (req, res, next) => {
  const totalUsers = await DB.countDocuments({});
  Helper.fMsg(res, "Total number of registered users:", totalUsers);
};
const changePassword = async (req, res, next) => {
  const result = await DB.findOne({ phone: req.user.phone });
  if (result) {
    if (Helper.checkPassword(req.body.oldPassword, result.password)) {
      let hashPassword = Helper.encode(req.body.password);
      await DB.findByIdAndUpdate(result._id, { password: hashPassword });
      Helper.fMsg(res, "Password successfully changed,please login again");
    } else next(new Error("Password is incorrect"));
  } else next(new Error("No user with that phone number"));
};
const forgetPassword = async (req, res, next) => {
  const result = await DB.findOne({ phone: req.body.phone });
  if (result) {
    let hashPassword = Helper.encode(req.body.password);
    await DB.findByIdAndUpdate(result._id, { password: hashPassword });
    const updateData = await DB.findOne({ phone: req.body.phone });
    Helper.fMsg(res, "Password successfully reseted", updateData);
  } else next(new Error("No user with that phone number"));
};
const updateProfile = async (req, res, next) => {
  const result = await DB.findOne({ phone: req.user.phone });
  if (result) {
    await DB.findByIdAndUpdate(result._id, req.body);
    const updateResult = await DB.findOne({ phone: req.user.phone });
    let user = updateResult.toJSON();
    delete user.password;
    Helper.fMsg(res, "Profile Updated", user);
  } else next(new Error("No user with that phone number"));
};

const dropUser = async (req, res, next) => {
  const dbResult = await DB.findById(req.params.id);
  if (dbResult) {
    await DB.findByIdAndDelete(req.params.id);
    Helper.fMsg(res, "User Deleted");
  } else next(new Error("No user with that Id "));
};

module.exports = {
  register,
  login,
  getUserByPhone,
  getEmployee,
  getCount,
  changePassword,
  updateProfile,
  forgetPassword,
  dropUser,
};
