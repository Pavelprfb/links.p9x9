const UsersModel = require("../models/UsersModel");

// Signup
exports.UsersSignup = async (req, res) => {
  res.render("./users/usersSignup");
}
// Signin
exports.UsersLogin = async (req, res) => {
  res.render("./users/usersLogin");
}
exports.logout = async (req, res) => {
  res.clearCookie("user");
  res.redirect("/");
}


exports.UsersSignupPost = async (req, res) => {

  const { number, password, name } = req.body;
  const profilePic = req.file.filename;

  try {

    const existingUser = await UsersModel.findOne({ number });

    if (existingUser) {
      return res.send("Account already exists");
    }

    const user = new UsersModel({
      name,
      number,
      password,
      profilePic
    });

    await user.save();

    // cookie save
    res.cookie("user", user._id, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    });

    res.redirect("/");

  } catch (error) {
    console.log(error);
    res.send("Signup Error");
  }

};

// Login
exports.UsersLoginPost = async (req, res) => {

  const { number, password } = req.body;

  try {

    const user = await UsersModel.findOne({ number });

    if (!user) {
      return res.send("Account not found");
    }

    if (user.password !== password) {
      return res.send("Wrong password");
    }

    // cookie save
    res.cookie("user", user._id, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    });

    res.redirect("/");

  } catch (error) {
    res.send("Login Error");
  }

};