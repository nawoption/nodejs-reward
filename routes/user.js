const controller = require("../controllers/user");
const { validateToken, validateRole } = require("../utils/validator");
const router = require("express").Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post(
  "/addPoint",
  validateToken(),
  validateRole("owner"),
  controller.addPoints
);
router.post("/removePoint",validateToken(),controller.removePoints);

module.exports = router;
