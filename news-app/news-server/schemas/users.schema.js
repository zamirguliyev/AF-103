const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  profileImg: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

module.exports = UserSchema;
