const roleDB = require("../models/role");
const userDB = require("../models/user");
const Helper = require("../utils/helper");

const roles = [{ name: "owner" }, { name: "admin" }, { name: "sale" },{name:"user"}];

const addRoles = async () => {
  let result = await roleDB.findOne({ name: "owner" });
  if (result) {
    console.log("roles added");
  } else {
    let result = await roleDB.insertMany(roles);
    console.log("roles migration done");
  }
};
const addUsers = async () => {
  const user = {
    name: "kyawthet",
    phone: "09100100100",
    password: "123123123",
    address: "meiktila",
  };
  const result = await userDB.findOne({ phone: "09100100100" });
  if (result) {
    console.log("user added");
  } else {
    user.password = Helper.encode(user.password);
    await new userDB(user).save();
    console.log("users migration done");
  }
};
const addOwnerRole = async () => {
  const ownerRole = await roleDB.findOne({ name: "owner" });
  const onwerUser = await userDB.findOne({ phone: "09100100100" });
  if (!onwerUser.role) {
    await userDB.findByIdAndUpdate(onwerUser._id, { role: ownerRole._id });
    console.log("add owner migration done");
  }
};
module.exports = {
  addRoles,
  addUsers,
  addOwnerRole,
};
