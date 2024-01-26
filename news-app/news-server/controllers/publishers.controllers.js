const PublisherModel = require("../models/publishers.model");
const NewsModel = require("../models/news.model");

const publisher_controller = {
  getAll: async (req, res) => {
    try {
      const publishers = await PublisherModel.find({});
      res.json(publishers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const publisher = await PublisherModel.findById(req.params.id);
      if (!publisher) {
        return res.status(404).json({ message: "Publisher not found" });
      }
      res.json(publisher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  post: async (req, res) => {
    const publisher = new PublisherModel(req.body);
    try {
      const newPublisher = await publisher.save();
      res.status(201).json(newPublisher);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    await PublisherModel.findByIdAndDelete(id);
    await NewsModel.deleteMany({ author: id });
    const publishe = await PublisherModel.find({});
    res.send(publishe);
  },
  putPublisher: async (req, res) => {
    try {
      const updatedPublisher = await PublisherModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedPublisher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  patchPublisher: async (req, res) => {
    try {
      const updatedPublisher = await PublisherModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedPublisher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = publisher_controller;
