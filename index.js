require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

const getUser = require("./middleware/getUser");

const webRoutes = require("./routes/web");
const apiRoutes = require("./routes/api");
const usersRoute = require("./routes/usersRoute");
const commentRoute = require("./routes/commentRoute");
const adminRoute = require("./routes/adminRoute");

const app = express();

// DB Connect
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(getUser);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("public"));

app.use("/", webRoutes);
app.use("/api", apiRoutes);
app.use("/users", usersRoute);
app.use("/", commentRoute);
app.use("/admin", adminRoute);


app.get("/path", (req, res)=>{
  res.render("path");
})
// সব route এর পরে রাখুন
app.use((req, res, next) => {
  res.status(404).render("error"); // "error" template render করবে
});





app.listen(process.env.PORT, () => {
  console.log("Server running...");
});