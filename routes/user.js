const controller = require("../controllers/user");
const { UserSchema } = require("../utils/schema");
const {
  validateToken,
  validateBody,
  hasAnyRole,
} = require("../utils/validator");
const router = require("express").Router();
router.get(
  "/findByPhone/:ph",
  validateToken(),
  hasAnyRole(["owner", "admin", "sale"]),
  controller.getUserByPhone
);
router.post(
  "/register",
  validateBody(UserSchema.register),
  controller.register
);
router.post("/login", controller.login);


module.exports = router;
