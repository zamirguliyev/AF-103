const express = require("express");
const publisher_router = express.Router();
const PublihserMiddle = require("../middlewares/publisher.middleware");
const publisher_controller = require("../controllers/publishers.controllers");

publisher_router.get("/", publisher_controller.getAll);

publisher_router.get("/:id", publisher_controller.getOne);

publisher_router.post("/", PublihserMiddle, publisher_controller.post);

publisher_router.delete("/:id", publisher_controller.delete);

publisher_router.patch("/:id", publisher_controller.patchPublisher);

module.exports = publisher_router;
