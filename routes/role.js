const controller = require("../controllers/role");
const router = require("express").Router();

router.get("/",controller.getRoles)
router.post("/change", controller.changeRole);
module.exports = router;
