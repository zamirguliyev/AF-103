const express = require("express");
const tag_router = express.Router();
const tags_controller = require("../controllers/tags.controllers");

tag_router.get("/", tags_controller.getAll);

tag_router.get("/:id", tags_controller.getOne);

tag_router.post("/", tags_controller.post);

tag_router.delete("/:id", tags_controller.delete);

tag_router.patch("/:id", tags_controller.patchTag);

module.exports = tag_router;
