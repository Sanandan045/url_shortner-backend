const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");

const urlRoute = require("./routes/url_route");
const staticRoute = require("./routes/static_route");
const userRoute = require("./routes/user_route");
const URL = require("./models/url_models");
const { restrictTo, checkForAuthentication } = require("./middlewares/auth");
const app = express();
const port = 8001;

//database connection

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./view"));

//middleware - plugin

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// app.get("/test", async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

app.use("/", staticRoute);
app.use("/user", userRoute);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);

// app.get("/:shortId", async (req, res) => {
//   const shortId = req.params.shortId;
//   const entry = await URL.findOneAndUpdate(
//     {
//       shortId,
//     },
//     {
//       $push: {
//         visitHistory: {
//           timestamps: Date.now(),
//         },
//       },
//     }
//   );

//   res.redirect(entry.redirectURL);
// });

app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;

    // Use findOne to get the document without updating it
    const entry = await URL.findOne({ shortId });

    if (!entry) {
      // Handle the case where the entry with the provided shortId is not found
      return res.status(404).json({ error: "URL not found" });
    }

    // Update the visit history
    entry.visitHistory.push({ timestamp: Date.now() });
    await entry.save(); // Save the updated entry

    // Redirect to the original URL
    return res.redirect(entry.redirectURL);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
