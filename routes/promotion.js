const router = require("express").Router();
const controller = require("../controllers/promotion");
const { singleFileSave } = require("../utils/gallery");
const { PromotionSchema } = require("../utils/schema");
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
  validateBody(PromotionSchema),
  controller.add
);
router.patch("/:id", validateToken(), validateRole("admin"), controller.patch);
router.delete("/:id", validateToken(), validateRole("admin"), controller.drop);
module.exports = router;
