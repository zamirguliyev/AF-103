const express = require("express");
const news_router = express.Router();
const news_controller = require("../controllers/news.controllers");

news_router.get("/", news_controller.getAll);

news_router.get("/:id", news_controller.getOne);

news_router.get("/publisher/:id", news_controller.getPublisherAllNews);

news_router.post("/", news_controller.post);

news_router.delete("/:id", news_controller.delete);

news_router.patch("/:id", news_controller.patchNews);

module.exports = news_router;
