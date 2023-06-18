const jwt = require("jsonwebtoken");
module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      let result = schema.validate(req.body);
      if (result.error) next(new Error(result.error.details[0].message));
      else next();
    };
  },
  validateRole: (roleName) => {
    return (req, res, next) => {
      let found = req.user.roles.find((role) => role.name == roleName);
      if (found) next();
      else next(new Error("You don't have permission"));
    };
  },
  validateToken: () => {
    return (req, res, next) => {
      if (req.headers.authorization) {
        let token = req.headers.authorization.split(" ")[1];
        let decode = jwt.verify(token, process.env.SECRET_KEY);
        if (decode) {
          req.user = decode;
          next();
        } else next(new Error("Tokenization Error"));
      } else next(new Error("Tokenization Error"));
    };
  },
};
