const express = require("express");
const Users = require("./users-model");
const bcrypt = require("bcrypt");
const router = express.Router();
const usersMiddleware = require("./users-middleware");

router.get("/users", usersMiddleware.restrict(), async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

router.post("/users", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    if (user) {
      return res.status(409).json({
        message: "Username is already taken",
      });
    }

    const newUser = await Users.add({
      username,
      password: await bcrypt.hash(password, 16),
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findBy({ username }).first();

    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    req.session.user = user;

    res.json({
      message: `Welcome ${user.username}!`,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
