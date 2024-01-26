const express = require("express");
const user_router = express.Router();
const UserMiddle = require("../middlewares/user.middleware");
const user_controller = require("../controllers/users.controllers");

user_router.get("/", user_controller.getAll);

user_router.get("/:id", user_controller.getOne);

user_router.post("/", UserMiddle, user_controller.post);

user_router.delete("/:id", user_controller.delete);

user_router.patch("/:id", user_controller.patchUser);

module.exports = user_router;
