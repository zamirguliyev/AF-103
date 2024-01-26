const SubscriptionModel = require("../models/subscriptions.model");

const subcscription_controller = {
  getAll: async (req, res) => {
    try {
      const subscriptions = await SubscriptionModel.find({});
      res.json(subscriptions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const subscription = await SubscriptionModel.findById(req.params.id);
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      res.json(subscription);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  post: async (req, res) => {
    const subscription = new SubscriptionModel(req.body);
    try {
      const newSubscription = await subscription.save();
      res.status(201).json(newSubscription);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },
  delete: async (req, res) => {
    try {
      await SubscriptionModel.findByIdAndDelete(req.params.id);
      res.json({ message: "Subscription deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  putSubs: async (req, res) => {
    try {
      const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedSubscription);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  patchSubs: async (req, res) => {
    try {
      const updatedSubscription = await SubscriptionModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.json(updatedSubscription);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};

module.exports = subcscription_controller;
