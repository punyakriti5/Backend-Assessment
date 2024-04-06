const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/signin");
  //const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

module.exports = router;