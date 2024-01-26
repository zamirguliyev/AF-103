const NewsModel = require("../models/news.model");

const news_controller = {
  getAll: async (req, res) => {
    try {
      const news = await NewsModel.find({});
      res.json(news);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getPublisherAllNews: async (req, res) => {
    const { id } = req.params;
    const publisher_news = await NewsModel.find({ author: id });
    res.send(publisher_news);
  },
  getOne: async (req, res) => {
    try {
      const news = await NewsModel.findById(req.params.id);
      if (!news) {
        return res.status(404).json({ message: "News not found" });
      }
      res.json(news);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  post: async (req, res) => {
    const news = new NewsModel(req.body);
    try {
      const newNews = await news.save();
      res.status(201).json(newNews);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      await NewsModel.findByIdAndDelete(req.params.id);
      res.json({ message: "News deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  putNews: async (req, res) => {
    try {
      const updatedNews = await NewsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedNews);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  patchNews: async (req, res) => {
    try {
      const updatedNews = await NewsModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedNews);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = news_controller;
