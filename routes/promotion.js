const router = require("express").Router();
const controller = require("../controllers/promotion");
const { singleFileSave } = require("../utils/gallery");
const { PromotionSchema } = require("../utils/schema");
const {
  validateBody,
  validateToken,
  hasAnyRole,
} = require("../utils/validator");

router.get("/", controller.all);
router.post(
  "/",
  validateToken(),
  hasAnyRole(["admin"]),
  validateBody(PromotionSchema),
  controller.add
);
router.patch("/:id", validateToken(), hasAnyRole(["admin"]), controller.patch);
router.delete("/:id", validateToken(), hasAnyRole(["admin"]), controller.drop);
module.exports = router;
