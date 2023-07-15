const controller = require("../controllers/rewardOrder");
const { hasAnyRole } = require("../utils/validator");
const router = require("express").Router();

router.get("/", controller.loginedUser);
router.get("/filter", hasAnyRole(["admin", "employee"]), controller.filterUser);

router.post("/", controller.add);
router.patch("/", hasAnyRole(["admin", "employee"]), controller.update);
module.exports = router;
