const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  profilePic: { type: String, required: true },
  postRouteName: { type: String, required: true }, // পোস্টের রুট নেম
  name: { type: String, required: true },          // ইউজারের নাম
  number: { type: String },                      // ইউজারের ইউজারনেম (optional)
  message: { type: String, required: true },       // কমেন্টের মেসেজ
  createdAt: { type: Date, default: Date.now }     // তৈরি হওয়ার সময়
});

module.exports = mongoose.model('Comment', commentSchema);