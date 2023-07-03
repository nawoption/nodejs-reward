const router = require("express").Router();
const controller = require("../controllers/activity");
const { validateToken, hasAnyRole } = require("../utils/validator");

router.get("/", controller.loginedUser);
router.get(
  "/:id",
  hasAnyRole(["owner", "admin", "sale"]),
  controller.filterUser
);
router.delete("/:id", hasAnyRole(["owner", "admin"]), controller.drop);
router.post(
  "/addPoint",
  hasAnyRole(["owner", "admin", "sale"]),
  controller.addPoints
);
router.post("/removePoint", controller.removePoints);
module.exports = router;
