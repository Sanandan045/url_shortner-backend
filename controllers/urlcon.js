const { nanoid } = require("nanoid");
const URL = require("../models/url_models");
// Generate a unique ID with a custom length (e.g., 10 characters)
const customLengthID = nanoid(8);

console.log("Custom Length ID:", customLengthID);

async function handleGenrateNewShortURL(req, res) {
  const shortID = nanoid(8);
  const body = req.body; // it takes url from body( fornt-end)

  //conditon for check url  ki user ne url diya ki nahi
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  // return res.json({ id: shortID });
  return res.render("home", {
    id: shortID,
  });
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenrateNewShortURL,
  handleGetAnalytics,
};
