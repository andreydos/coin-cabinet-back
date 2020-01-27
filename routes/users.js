const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  // Create a new user
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res
      .status(400)
      .send(error.code !== 11000 ? error : { message: "User already exist!" });
  }
});

// eslint-disable-next-line consistent-return
router.post("/login", async (req, res) => {
  // Login a registered user
  try {
    const { email, password } = req.body;

    const user = await User.findByCredentials(email, password);

    if (!user) {
      return res
        .status(401)
        .send({ message: "Check authentication credentials." });
    }
    const token = await user.generateAuthToken();
    res.send({
      user: {
        email: user.email,
        baseCurrency: email.baseCurrency,
      },
      token,
    });
  } catch (error) {
    res.status(400).send(error.message || error);
  }
});

router.get("/me", auth, async (req, res) => {
  // View logged in user profile
  res.send(req.user);
  res.send({
    name: req.user.name,
    email: req.user.email,
  });
});

router.post("/me/logout", auth, async (req, res) => {
  // Log user out of the application
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token,
    );
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/me/logoutall", auth, async (req, res) => {
  // Log user out of all devices
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
