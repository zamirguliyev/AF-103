const express = require("express");
const subscription_router = express.Router();
const subcscription_controller = require("../controllers/subscriptions.controllers");

subscription_router.get("/", subcscription_controller.getAll);

subscription_router.get("/:id", subcscription_controller.getOne);

subscription_router.post("/", subcscription_controller.post);

subscription_router.delete("/:id", subcscription_controller.delete);

subscription_router.patch("/:id", subcscription_controller.patchSubs);

module.exports = subscription_router;
