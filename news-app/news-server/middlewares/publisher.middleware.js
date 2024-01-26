const PublisherModel = require("../models/publishers.model");
const PublihserValidation = require("../validations/publisher.validation");

const PublihserMiddle = async (req, res, next) => {
  const { error } = PublihserValidation.validate(req.body);
  const { username } = req.body;

  const duplicate = await PublisherModel.find({ username });
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

module.exports = PublihserMiddle;
