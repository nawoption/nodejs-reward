const router = require("express").Router();
const controller = require("../controllers/reward");
const { singleFileSave } = require("../utils/gallery");
const { RewardSchema } = require("../utils/schema");
const { validateBody, hasAnyRole } = require("../utils/validator");

router.get("/", controller.all);
router.post(
  "/",
  hasAnyRole(["admin"]),
  validateBody(RewardSchema),
  controller.add
);
router.patch("/:id", hasAnyRole(["admin"]), controller.patch);
router.delete("/:id", hasAnyRole(["admin"]), controller.drop);
module.exports = router;
