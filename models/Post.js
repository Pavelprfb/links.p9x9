const mongoose = require("mongoose");

function getFormattedDate() {
  const now = new Date();
  const tzOffset = -now.getTimezoneOffset();
  const diff = tzOffset >= 0 ? "+" : "-";
  const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");

  return now.getFullYear() +
    "-" + pad(now.getMonth()+1) +
    "-" + pad(now.getDate()) +
    "T" + pad(now.getHours()) +
    ":" + pad(now.getMinutes()) +
    ":" + pad(now.getSeconds()) +
    diff + pad(tzOffset/60) + ":00";
}

const postSchema = new mongoose.Schema({
  routeName: { type: String, required: true, unique: true },
  title: String,
  description: String,
  shortDescription: String,
  imageLink: String,
  videoLink: String,
  totalView: { type: Number, default: 0 },
  duration: String,
  category: [String],
  date: { type: String, default: getFormattedDate },
  updateDate: { type: String, default: getFormattedDate }
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);