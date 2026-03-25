module.exports = (req, res, next) => {

  const user = req.cookies.user;

  if (user) {
    return res.redirect("/");
  }

  next();
};