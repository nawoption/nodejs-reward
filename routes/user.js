const controller = require("../controllers/user");
const { UserSchema } = require("../utils/schema");
const {
  validateToken,
  validateRole,
  validateBody,
} = require("../utils/validator");
const router = require("express").Router();
router.get(
  "/findByPhone/:ph",
  validateToken(),
  validateRole("sale"),
  controller.getUserByPhone
);
router.post(
  "/register",
  validateBody(UserSchema.register),
  controller.register
);
router.post("/login", controller.login);
router.post(
  "/addPoint",
  validateToken(),
  validateRole("sale"),
  controller.addPoints
);
router.post("/removePoint", validateToken(), controller.removePoints);

module.exports = router;
