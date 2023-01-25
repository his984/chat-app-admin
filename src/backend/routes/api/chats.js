const express = require('express');
const chatsRouter = express.Router();
const {getUsers} = require("../../controllers/user_controller");
const {body} = require("express-validator");
const db = require("../../database/models");
const {createChat, getChats} = require("../../controllers/chat_controller");


chatsRouter.get('/', (req, res) => {
    getChats(req, res).catch((reason) => {
        console.log(reason)
        res.status(400).json()
    })
})
chatsRouter.get('/:chatId', (req, res) => {
    getChats(req, res).catch((reason) => {
        console.log(reason)
        res.status(400).json()
    })
})

chatsRouter.post('/'
    , body('subject').isString().isLength({min: 4, max: 99})
    , body('selectedUsers').isArray().custom((value) => {

        return db.User.count({where: {id: {$in: value}}}).then(count => {
            if (count || !!value ) {
                return Promise.reject('invalid selected users');
            }
        })
    })
    , (req, res) => {
        createChat(req, res).catch((er) => {
            console.log(er)
            res.status(400).json()
        })

    }
);


chatsRouter.post('/:chatId/:userId', (req, res) => {

})


module.exports = chatsRouter;