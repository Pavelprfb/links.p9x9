const UsersModel = require("../models/UsersModel");

module.exports = async (req, res, next) => {
  const userId = req.cookies.user;

  if (!userId) {
    req.user = null;
  } else {
    const user = await UsersModel.findById(userId);
    req.user = user || null;
  }

  // সব template এ user variable
  res.locals.user = req.user;

  next();
};