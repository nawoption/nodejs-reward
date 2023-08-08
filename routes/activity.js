const router = require("express").Router();
const controller = require("../controllers/activity");
const { hasAnyRole,validateRole } = require("../utils/validator");

router.get("/", controller.loginedUser);
router.get("/points/:desiredDate", validateRole("admin"), controller.getToday);
router.get("/records/:desiredDate", validateRole("admin"), controller.getTransaction);
router.get("/user/:id", controller.filterUser);

router.post("/addPoint",hasAnyRole(["admin","employee"]), controller.addPoints);


// router.delete("/:id", hasAnyRole(["admin"]), controller.drop);
// router.post("/removePoint", controller.removePoints);
module.exports = router;
