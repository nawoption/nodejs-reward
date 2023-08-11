const router = require("express").Router();
const controller = require("../controllers/reward");
const { singleFileSave } = require("../utils/gallery");
const { RewardSchema } = require("../utils/schema");
const { validateBody, validateRole } = require("../utils/validator");

router.get("/", controller.all);
router.post(
  "/",
  validateRole("admin"),
  validateBody(RewardSchema),
  controller.add
);
router.patch("/:id", validateRole("admin"), controller.patch);
router.delete("/:id", validateRole("admin"), controller.drop);
module.exports = router;
