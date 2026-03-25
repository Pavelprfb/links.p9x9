module.exports = (req, res, next) => {

  // login page হলে middleware skip
  if (req.path === "/admin/login") {
    return next();
  }

  const admin = req.cookies.admin;

  if (admin) {
    next();
  } else {
    res.redirect("/admin/login");
  }

};