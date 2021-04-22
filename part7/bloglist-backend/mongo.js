const mongoose = require("mongoose");
const config = require("./utils/config");

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
