const DB = require("../models/role");
const userDB = require("../models/user");
const Helper = require("../utils/helper");

const getRoles = async (req, res, next) => {
  let results = await DB.find();
  Helper.fMsg(res, "All roles", results);
};
const changeRole = async (req, res, next) => {
  let dbUser = await userDB.findById(req.body.userId);
  let dbRole = await DB.findById(req.body.roleId);
  await userDB.findByIdAndUpdate(dbUser._id, { role: dbRole._id });
  Helper.fMsg(res, "Changed Role to user");
};

module.exports = {
  changeRole,
  getRoles,
};
