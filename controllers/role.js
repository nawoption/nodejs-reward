const DB = require("../models/roles");
const userDB = require("../models/user");
const Helper = require("../utils/helper");

const getUsers = async (req, res, next) => {
  let results = await userDB.find();
  Helper.fMsg(res, "All users", results);
};
const getRoles = async (req, res, next) => {
  let results = await DB.find();
  Helper.fMsg(res, "All roles", results);
};
const addRole = async (req, res, next) => {
  let dbUser = await userDB.findById(req.body.userId);
  let dbRole = await DB.findById(req.body.roleId);
  let foundRole = dbUser.roles.find((rid) => rid.equals(dbRole._id));
  if (foundRole) {
    next(new Error("Role already added"));
  } else {
    await userDB.findByIdAndUpdate(dbUser._id, {
      $push: { roles: dbRole._id },
    });
    Helper.fMsg(res, "Added Role to user");
  }
};
const removeRole = async (req, res, next) => {
  let dbUser = await userDB.findById(req.body.userId);
  let roleFound = dbUser.roles.find((rid) => rid.equals(req.body.roleId));
  if (roleFound) {
    await userDB.findByIdAndUpdate(dbUser._id, {
      $pull: { roles: req.body.roleId },
    });
    Helper.fMsg(res, "Removed role");
  } else next(new Error("Role doen't exist"));
};
module.exports = {
  addRole,
  removeRole,
  getUsers,
  getRoles,
};
