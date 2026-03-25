const Comment = require('../models/Comment');  
const UsersModel = require('../models/UsersModel');  

// নতুন কমেন্ট পোস্ট করা
exports.commentPost = async (req, res) => {  
  try {  
    const { profilePic, postRouteName, name, number, message } = req.body;  

    // চেক করো ফোন নম্বর UsersModel-এ আছে কি না
    const userExists = await UsersModel.findOne({ number: number });  
    if (!userExists) {
      return res.status(400).redirect("/users/login");
    }  

    // **মেসেজে লিংক আছে কি না চেক করা**
    const urlPattern = /\b((https?:\/\/)?(www\.)?[a-z0-9-]+\.[a-z]{2,}(\S*)?)\b/i;

    if (urlPattern.test(message)) {
      // লিংক থাকলে comment add হবে না
      return res.status(400).send('Comments containing links are not allowed.');
    }

    // সব ঠিক থাকলে comment save
    const newComment = new Comment({ profilePic, postRouteName, name, number, message });  
    await newComment.save();  

    res.redirect(`/videos/${postRouteName}`);  
  } catch (err) {  
    console.error(err);  
    res.status(500).send('Something went wrong');  
  }  
};