require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(fileupload());
app.use(cors());
// mongoose.connect("mongodb://127.0.0.1:27017/reward");
mongoose.connect("mongodb+srv://admin:gN0SRqS7KBY6jckW@reward.qo6mqkh.mongodb.net/?retryWrites=true");

const userRoute = require("./routes/user");
const roleRoute = require("./routes/role");
const promotionRoute = require("./routes/promotion");
const rewardRoute = require("./routes/reward");
const activityRoute = require("./routes/activity");
const rewardOrder = require("./routes/rewardOrder");
const { validateToken, validateRole, hasAnyRole } = require("./utils/validator");

app.use("/users", userRoute);
app.use("/promotion", promotionRoute);
app.use("/reward", validateToken(), rewardRoute);
app.use("/roles", validateToken(), validateRole("admin"), roleRoute);
app.use("/rewardOrder", validateToken(), rewardOrder);
app.use("/activity", validateToken(), activityRoute);
app.use("/", (req, res, next) => {
  res.status(200).send({ msg: "Hello Wrold" });
});

const defaultData = async () => {
  const migrator = require("./migrations/migrator");
  await migrator.addRoles();
  await migrator.addUsers();
  await migrator.addOwnerRole();
};
defaultData();

app.use((err, req, res, next) => {
  if (err) {
    res.status(200).json({
      con: false,
      msg: err.message,
    });
  }
});

app.listen(3000, console.log(`Server is listen at port ${process.env.PORT}`));
