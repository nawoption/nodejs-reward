const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  fMsg: (res, msg = "", result = []) => {
    res.send({
      con: true,
      msg,
      result,
    });
  },
  encode: (password) => bcryptjs.hashSync(password),
  checkPassword: (password, hastText) =>
    bcryptjs.compareSync(password, hastText),
  makeToken: (payload) =>
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" }),
};
