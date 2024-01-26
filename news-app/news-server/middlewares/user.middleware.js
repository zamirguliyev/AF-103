const UserModel = require("../models/users.model");
const UserValidation = require("../validations/user.validation");

const UserMiddle = async (req, res, next) => {
  const { error } = UserValidation.validate(req.body);
  const { username } = req.body;

  const duplicate = await UserModel.find({ username });
  console.log("duplicate", duplicate);
  if (duplicate.length > 0) {
    res.send({ message: "username already exists!" });
    return;
  }
  if (!error && duplicate.length === 0) {
    next();
  } else {
    const { details } = error;
    const message = details[0].message;
    res.send({ message });
  }
};

module.exports = UserMiddle;
