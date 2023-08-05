require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");

const app = express();
app.use(express.json());
app.use(fileupload());
// mongoose.connect("mongodb://127.0.0.1:27017/reward");
mongoose.connect(process.env.DB_Link);

const userRoute = require("./routes/user");
const roleRoute = require("./routes/role");
const promotionRoute = require("./routes/promotion");
const rewardRoute = require("./routes/reward");
const activityRoute = require("./routes/activity");
const rewardOrder = require("./routes/rewardOrder");
const {
  validateToken,
  validateRole,
  hasAnyRole,
} = require("./utils/validator");

app.use("/users", userRoute);
app.use("/promotion", promotionRoute);
app.use("/reward", validateToken(), rewardRoute);
app.use("/roles", validateToken(), validateRole("admin"), roleRoute);
app.use("/rewardOrder", validateToken(), rewardOrder);
app.use(
  "/activity",
  validateToken(),
  hasAnyRole(["admin", "employee"]),
  activityRoute
);

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

app.listen(
  process.env.PORT,
  console.log(`Server is listen at port ${process.env.PORT}`)
);
