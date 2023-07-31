const router = require("express").Router();
const controller = require("../controllers/activity");
const { validateToken, hasAnyRole } = require("../utils/validator");

router.get("/", controller.loginedUser);
router.get(
  "/:id",
  hasAnyRole(["admin", "employee"]),
  controller.filterUser
);
// router.delete("/:id", hasAnyRole(["admin"]), controller.drop);
router.post(
  "/addPoint",
  hasAnyRole(["admin", "employee"]),
  controller.addPoints
);
// router.post("/removePoint", controller.removePoints);
module.exports = router;
