const router = require("express").Router();
const controller = require("../controllers/activity");
const { validateToken, hasAnyRole } = require("../utils/validator");

router.get("/", validateToken(), controller.loginedUser);
router.get(
  "/:id",
  validateToken(),
  hasAnyRole(["owner", "admin", "sale"]),
  controller.filterUser
);
router.delete(
  "/:id",
  validateToken(),
  hasAnyRole(["owner", "admin"]),
  controller.drop
);
router.post(
  "/addPoint",
  validateToken(),
  hasAnyRole(["owner", "admin", "sale"]),
  controller.addPoints
);
router.post("/removePoint", validateToken(), controller.removePoints);
module.exports = router;
