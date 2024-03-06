// const sesssionIdToUserMap = new Map();        it is use in statefull authentication

// here we apply statefull with the help of jwt token

const jwt = require("jsonwebtoken");
const secret = "Sandy$123$";

function setUser(user) {
  // sesssionIdToUserMap.set(id, user);

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
}

function getUser(token) {
  // return sesssionIdToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
