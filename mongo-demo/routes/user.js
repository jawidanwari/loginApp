const express = require("express");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { User, validate } = require("../model/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.findById(req.params.id);
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email,
  });
  if (user) return res.status(400).send("User already registered.");

  //   const isValid = await bcrypt.compare(req.body.password, user.password);
  //   if (!isValid) return res.status(400).send("Invalid Email or Password.");

  // user = new User({
  //   id: req.body.id,
  //   name: req.body.name,
  //   email: req.body.email,
  //   password: req.body.password,
  // });

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-contorl-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.put("/:id", async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });
  res.send(updateUser);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.send(user);
});

module.exports = router;
