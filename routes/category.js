const router = require("express").Router();
const controller = require("../controllers/category");
const { singleFileSave } = require("../utils/gallery");
const { CategorySchema } = require("../utils/schema");
const { validateBody, validateRole } = require("../utils/validator");

router.get("/", controller.all);
router.post("/", singleFileSave, validateBody(CategorySchema), controller.add);

router.patch("/:id", controller.patch);
router.delete("/:id", controller.drop);
module.exports = router;
