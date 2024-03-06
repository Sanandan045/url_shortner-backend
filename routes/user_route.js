//  yha pe user se related sara kaam hoga   jaise   login, sign up authentication

//--------------

const express = require("express");
const {
  handleUserSignUp,
  handleUserLogin,
} = require("../controllers/user_controller");

const router = express.Router();

router.post("/", handleUserSignUp);

router.post("/login", handleUserLogin);
// router.get("/logout", handleUserLogout);
// router.get("/logout", handleUserLogout);

module.exports = router;
