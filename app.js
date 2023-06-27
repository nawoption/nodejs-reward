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
const { validateToken, validateRole } = require("./utils/validator");

app.use("/users", userRoute);
app.use("/roles", validateToken(), validateRole("owner"), roleRoute);
app.use("/promotion", promotionRoute);
app.use("/reward", rewardRoute);
app.use("/activity", validateToken(), activityRoute);

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
  console.log(`Server is listen ${process.env.PORT}`)
);
