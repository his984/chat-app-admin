const express = require("express");
const chatsRouter = express.Router();
const { getUsers } = require("../../controllers/user_controller");
const { body } = require("express-validator");
const db = require("../../database/models");
const {
  createChat,
  getChats,
  getChat,
  getInvitations,
  rejectInvitation,
} = require("../../controllers/chat_controller");
const { validatorMiddleware } = require("../../middlewares/validator");
const { Op } = require("sequelize");

chatsRouter.get("/", (req, res) => {
  getChats(req, res).catch((reason) => {
    console.log(reason);
    res.status(400).json({ row: [] });
  });
});
chatsRouter.get("/invitations", (req, res) => {
  getInvitations(req, res).catch((reason) => {
    console.log(reason);
    res.status(400).json();
  });
});
chatsRouter.get("/:chatId", (req, res) => {
  getChat(req, res).catch((reason) => {
    console.log(reason);
    res.status(400).json();
  });
});

chatsRouter.post(
  "/",
  body("subject").isString().isLength({ min: 4, max: 99 }),
  body("selectedUsers")
    .isArray()
    .custom((value) => {
      return db.User.count({ where: { id: { [Op.in]: value } } }).then(
        (count) => {
          if (count === 0) {
            return Promise.reject("invalid selected users");
          }
        }
      );
    }),
  validatorMiddleware,
  (req, res) => {
    createChat(req, res).catch((er) => {
      res.status(400).json();
    });
  }
);

chatsRouter.post("/:chatId", (req, res) => {
  rejectInvitation(req, res).catch((er) => {
    res.status(400).json();
  });
});

module.exports = chatsRouter;
