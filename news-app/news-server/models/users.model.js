const mongoose = require("mongoose");
const UserSchema = require("../schemas/users.schema");

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
