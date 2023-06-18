const singleFileSave = async (req, res, next) => {
  if (req.files) {
    const file = req.files.image;
    const file_name = new Date().valueOf() + "_" + file.name;
    file.mv(`./uploads/${file_name}`);
    req.body["image"]=file_name;
    next();
  }
};

const multiFileSave = async (req, res, next) => {
  console.log(req.body);
};

module.exports = {
  singleFileSave,
  multiFileSave,
};
