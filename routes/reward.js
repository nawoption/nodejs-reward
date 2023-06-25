const router = require("express").Router();
const controller = require("../controllers/reward");
const { singleFileSave } = require("../utils/gallery");
const { RewardSchema } = require("../utils/schema");
const {
  validateToken,
  validateBody,
  hasAnyRole,
} = require("../utils/validator");

router.get("/", controller.all);
router.post(
  "/",
  validateToken(),
  hasAnyRole(["owner", "admin"]),
  validateBody(RewardSchema),
  controller.add
);
router.patch(
  "/:id",
  validateToken(),
  hasAnyRole(["owner", "admin"]),
  controller.patch
);
router.delete(
  "/:id",
  validateToken(),
  hasAnyRole(["owner", "admin"]),
  controller.drop
);
module.exports = router;
