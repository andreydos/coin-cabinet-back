const express = require("express");
const helpers = require("../mocks/helpers");
// const User = require("../models/Wallets");

const router = express.Router();

router.post("/create-wallet", async (req, res) => {
  // Create a new user
  try {
    // const user = new User(req.body);
    // await user.save();
    res.status(200).send();
  } catch (error) {
    res.status(400).send();
  }
});

// eslint-disable-next-line consistent-return
router.get("/all", async (req, res) => {
  try {
    res.send(helpers.generateFakeWallets(4));
  } catch (error) {
    res.status(400).send(error.message || error);
  }
});

module.exports = router;
