const config = require("config");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./routes/user");
const auth = require("./routes/auth");
const express = require("express");
const app = express();
app.use(cors());

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/user-exercise")
  .then(() => console.log("Connected to MongoDB ..."))
  .catch((err) => console.log("Could not connect to MongoDB ..", err));

app.use(express.json());
app.use("/new/auth", auth);
app.use("/new/users", user);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to Port ${port}...`));
