const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoutes = require("./routes/user.routes");
const TestRoutes = require("./routes/test.routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
// mongoose.set("useUnifiedTopology", true);

mongoose.connect(
  "mongodb+srv://admin:admin123@apptask.qdvlc.mongodb.net/userData?retryWrites=true&w=majority",
  (err, db) => {
    console.log("Db connected");
  }
);

app.use("/users", UserRoutes);
app.use("/test", TestRoutes);

const port = 5050 || process.env.PORT;

app.listen(port, () => {
  console.log(`Server is started on port :${port}`);
});

module.exports = app;
