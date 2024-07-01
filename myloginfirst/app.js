const Joi = require("joi");
const express = require("express");
const mongoose = require("mongoose");
const { User } = require("./mongo");
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

app.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists.");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  await user.save();
  res.send(user);
});

function validate(req) {
  const schema = {
    username: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(req, schema);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
