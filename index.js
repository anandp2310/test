/**
 * @Author: Your name
 * @Date:   2023-05-09 20:19:13
 * @Last Modified by:   Your name
 * @Last Modified time: 2023-05-09 20:37:53
 */
require("./models/User");
require("./models/Track");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");
const keys = require("../config/keys");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI = "mongodb+srv://Deepa123:Deepa123@cluster0.7rmtabr.mongodb.net/?retryWrites=true&w=majority"
;

mongoose.connect(mongoURI);

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB instance");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongoDB", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
