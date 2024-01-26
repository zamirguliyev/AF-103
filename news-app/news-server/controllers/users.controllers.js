const UserModel = require("../models/users.model");

const user_controller = {
  getAll: async (req, res) => {
    const { username } = req.query;
    const users = await UserModel.find({});
    if (username) {
      const filteredUsers = users.filter((x) =>
        x.username.toLowerCase().trim().includes(username.toLowerCase().trim())
      );
      res.send(filteredUsers);
    } else {
      res.send(users);
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.send({ message: "not found" });
    }
  },
  post: async (req, res) => {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.send(newUser);
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await UserModel.findByIdAndDelete(id);
    const user = await UserModel.find({});
    res.send(user);
  },
  putUser: async (req, res) => {
    const { id } = req.params;
    await UserModel.findByIdAndUpdate(id, req.body);
    const updatedUser = await UserModel.findById(id);
    res.send(updatedUser);
  },
  patchUser: async (req, res) => {
    const { id } = req.params;
    await UserModel.findByIdAndUpdate(id, req.body);
    const updatedUser = await UserModel.findById(id);
    res.send(updatedUser);
  },
};
module.exports = user_controller;
