const controller = require("../controllers/role");
const router = require("express").Router();

router.get("/",controller.getRoles)
router.get("/users", controller.getUsers);
router.post("/add", controller.addRole);
router.post("/remove", controller.removeRole);
module.exports = router;
