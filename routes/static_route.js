const express = require("express");

const URL = require("../models/url_models");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

// router.get("/", async (req, res) => {
//   const allurls = await URL.find({});
//   return res.render("home", {
//     urls: allurls,
//   });
// });

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  const allurls = await URL.find({});
  return res.render("home", {
    urls: allurls,
  });
});

router.get("/", restrictTo(["ADMIN", "NORMAL"]), async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
      user: {
        name: req.user.name, // Assuming user's name is available in 'name' property
        email: req.user.email, // Assuming user's email is available in 'email' property
      },
      urls: allurls,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

// router.get("/logout", (req, res) => {
//   res.render("logout"); // Render the login page
// });

module.exports = router;
