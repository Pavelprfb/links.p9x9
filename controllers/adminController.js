const Admin = require("../models/Admin");
const UsersModel = require("../models/UsersModel");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// login page
exports.adminLoginPage = async (req, res) => {
  
  
  res.render("admin/login");
};

// login process
exports.adminLogin = async (req, res) => {
  try {

    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.send("Admin not found");
    }

    if (admin.password !== password) {
      return res.send("Wrong password");
    }

    // cookie set
    res.cookie("admin", admin._id, {
  httpOnly: true
});

    res.redirect("/admin/dashboard");

  } catch (error) {
    console.log(error);
    res.send("Server error");
  }
};

exports.adminLogout = (req, res) => {
  res.clearCookie("admin");
  res.redirect("/admin/login");
};
exports.adminDashboard = async (req, res) => {
  const dataUsersModel = await UsersModel.find({});
  const dataPost = await Post.find({});
  const dataComment = await Comment.find({});
  
  res.render("admin/dashboard",  {dataUsersModel, dataPost, dataComment});
};