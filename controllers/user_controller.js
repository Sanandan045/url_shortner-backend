const { v4: uuidv4 } = require("uuid");
const User = require("../models/user_models");
const { setUser } = require("../service/auth");

//SignUp handlling

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

//Login handle here

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log("User: ", user.email);

  if (!user) {
    return res.render("login", {
      error: "Invalid Username, or Password",
    });
  }

  // const sessionId = uuidv4();
  const token = setUser(user);

  res.cookie("token", token);

  return res.redirect("/");
}

// logOut handle here

// async function handleUserLogout(req, res) {
//   try {
//     // Clear the token cookie
//     res.clearCookie("token");
//     // Redirect to the login page
//     res.redirect("/login");
//   } catch (error) {
//     console.error("Error occurred during logout:", error);
//     res.status(500).send("Internal Server Error");
//   }
// }

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
