const router = require("express").Router();
const controller = require("../controllers/activity");
const { validateToken, validateRole } = require("../utils/validator");

router.get("/", controller.all);
router.delete("/:id", validateToken(), validateRole("admin"), controller.drop);
module.exports = router;
