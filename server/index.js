const express = require("express");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();
//middleware;
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(express.json());
const bodyparser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
const router = require("./Routers/Route");
// const { verifyJWT } = require("./middlewares/auth.middleware");
app.use("/api", router.router);
app.use(bodyparser.urlencoded(encodeURI));
// mongodb connection;
mongoose
  .connect("mongodb://127.0.0.1:27017/chat-app")
  .catch((error) => handleError(error))
  .then(() => {
    console.log("db is connected");
  });
// app.get("/setcookies", (req, res) => {
//   res.cookie("name", "vijay raj");
//   res.send("cookies set");
// });
// app.get("/getcookies", verifyJWT, (req, res) => {
//   res.json(req.cookies);
// });
app.listen(5000, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
