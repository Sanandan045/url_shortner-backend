const express = require("express");
const {
  handleGenrateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/urlcon");
const router = express.Router();

router.post("/", handleGenrateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
