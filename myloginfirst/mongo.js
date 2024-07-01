const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/newUser")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((e) => console.error("could not connect to mongoDB", e));

const User = mongoose.model(
  "user",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      min: 5,
    },

    passworrd: {
      type: String,
      required: true,
    },
  })
);

exports.User = User;
