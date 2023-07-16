const controller = require("../controllers/rewardOrder");
const { hasAnyRole } = require("../utils/validator");
const router = require("express").Router();

router.get("/", controller.loginedUser);
router.get("/pending", hasAnyRole(["admin", "employee"]), controller.filterPendingOrders);
router.get("/received", hasAnyRole(["admin", "employee"]), controller.filterReceivedOrders);

router.post("/", controller.add);
router.patch("/", hasAnyRole(["admin", "employee"]), controller.update);
module.exports = router;
