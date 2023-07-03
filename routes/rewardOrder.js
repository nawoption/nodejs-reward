const controller = require("../controllers/rewardOrder");
const { hasAnyRole } = require("../utils/validator");
const router = require("express").Router();

router.get("/",controller.loginedUser);
router.get("/filter",hasAnyRole(["owner","admin","sale"]) ,controller.filterUser);

router.post("/" ,controller.add);

module.exports = router;
