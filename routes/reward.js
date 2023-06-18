const router = require("express").Router();
const controller = require("../controllers/reward");
const { singleFileSave } = require("../utils/gallery");
const { RewardSchema } = require("../utils/schema");
const {
  validateToken,
  validateRole,
  validateBody,
} = require("../utils/validator");

router.get("/", controller.all);
router.post(
  "/",
  validateToken(),
  validateRole("admin"),
  singleFileSave,
  validateBody(RewardSchema),
  controller.add
);
router.patch("/:id", validateToken(), validateRole("admin"), controller.patch);
router.delete("/:id", validateToken(), validateRole("admin"), controller.drop);
module.exports = router;
