const router = require("express").Router();
const controller = require("../controllers/activity");
const { hasAnyRole } = require("../utils/validator");

router.get("/", controller.loginedUser);
router.get("/points/:desiredDate", controller.getToday);
router.get("/records/:desiredDate", controller.getTransaction);
router.get("/user/:id", controller.filterUser);

router.post("/addPoint", controller.addPoints);


// router.delete("/:id", hasAnyRole(["admin"]), controller.drop);
// router.post("/removePoint", controller.removePoints);
module.exports = router;
