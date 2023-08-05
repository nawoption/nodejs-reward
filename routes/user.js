const controller = require("../controllers/user");
const { UserSchema } = require("../utils/schema");
const {
  validateToken,
  validateBody,
  hasAnyRole,
  validateRole,
} = require("../utils/validator");
const router = require("express").Router();
router.get(
  "/findByPhone/:ph",
  validateToken(),
  hasAnyRole(["admin", "employee"]),
  controller.getUserByPhone
);
router.get(
  "/employee",
  validateToken(),
  hasAnyRole(["admin", "employee"]),
  controller.getEmployee
);
router.get(
  "/count",
  validateToken(),
  validateRole("admin"),
  controller.getCount
);
router.post(
  "/register",
  validateBody(UserSchema.register),
  controller.register
);
router.post("/login", validateBody(UserSchema.login), controller.login);
router.patch(
  "/changePassword",
  validateToken(),
  validateBody(UserSchema.changePassword),
  controller.changePassword
);
router.patch(
  "/forgetPassword",
  validateToken(),
  hasAnyRole(["admin"]),
  controller.forgetPassword
);
router.patch(
  "/update",
  validateToken(),
  validateBody(UserSchema.updateProfile),
  controller.updateProfile
);
router.delete(
  "/drop/:id",
  validateToken(),
  validateRole("admin"),
  controller.dropUser
);

module.exports = router;
