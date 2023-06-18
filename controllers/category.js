const DB = require("../models/category");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  const cats = await DB.find();
  Helper.fMsg(res, "All category", cats);
};
const add = async (req, res, next) => {
  const dbResult = await DB.findOne({ name: req.body.name });
  if (dbResult) {
    next(new Error("Category Name Already Exists"));
  } else {
    const result = await new DB(req.body).save();
    Helper.fMsg(res, "Saved Category", result);
  }
};
const patch = async (req, res, next) => {
  const dbResult = await DB.findById(req.params.id);
  if (dbResult) {
    await DB.findByIdAndUpdate(dbResult._id,req.body);
    const result = await DB.findById(dbResult._id);
    Helper.fMsg(res, "Updated", result);
  } else {
    next(new Error("No category with that id"));
  }
};
const drop = async(req,res,next)=>{
  const dbResult = await DB.findById(req.params.id);
  if(dbResult){
    await DB.findByIdAndDelete(dbResult._id)
    Helper.fMsg(res,"Deleted Category");
  }else{
    next(new Error("No category with that id"));
  }
}
module.exports = {
  all,
  add,
  patch,
  drop
};
