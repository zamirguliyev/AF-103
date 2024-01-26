const TagsModel = require("../models/tags.model");

const tags_controller = {
  getAll: async (req, res) => {
    try {
      const tags = await TagsModel.find({});
      res.json(tags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const tags = await TagsModel.findById(req.params.id);
      if (!tags) {
        return res.status(404).json({ message: "Tags not found" });
      }
      res.json(tags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  post: async (req, res) => {
    const tags = new TagsModel(req.body);
    try {
      const newTags = await tags.save();
      res.status(201).json(newTags);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      await TagsModel.findByIdAndDelete(req.params.id);
      res.json({ message: "Tags deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  putTag: async (req, res) => {
    try {
      const updatedTags = await TagsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedTags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  patchTag: async (req, res) => {
    try {
      const updatedTags = await TagsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedTags);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = tags_controller;
