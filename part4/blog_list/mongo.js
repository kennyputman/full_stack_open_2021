const mongoose = require("mongoose");
const config = require("./utils/config");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  date: Date,
});

const Blog = mongoose.model("Blog", blogSchema);
