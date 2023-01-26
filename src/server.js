require("dotenv").config();
const {PORT = 3001} = process.env;
const path = require('path');
const express = require('express');
const apiRouter = require("./backend/routes/api");
const {expressjwt: jwt} = require("express-jwt");
const cors = require("cors");
const http = require('http');
const app = express();
const server = http.createServer(app);
const {Server} = require("socket.io");
const {isValidToken} = require("./backend/utils");
const db = require("./backend/database/models");
const {Op} = require("sequelize");
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors());
app.use(express.json());
app.use(
    jwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],


        getToken: function fromHeaderOrQuerystring(req) {
            if (
                req.headers.authorization &&
                req.headers.authorization.split(" ")[0] === "Bearer"
            ) {
                return req.headers.authorization.split(" ")[1];
            } else if (req.query && req.query.accessToken) {
                return req.query.accessToken;
            } else if (req.body && req.body.accessToken) {
                return req.body.accessToken;
            }
            return null;
        },

    }).unless({path: ["/api/auth/login", "/api/auth/register"]})
);
// Serve API requests from the router
app.use('/api', apiRouter);


// this code for server app in production mode

app.use(express.static('dist/app'));


io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    const chatId = socket.handshake.auth.chatId;
    const {userId, role} = isValidToken(token)
    if (role !== 'admin') {
        const chatUser = await db.ChatUser.findOne({where: {userId, chatId, status: {[Op.in]: ['active', 'invited']}}})
        if (!!chatUser) {
            chatUser.stat = 'active';
            await chatUser.save()
        } else {
            return next(new Error(JSON.stringify({
                code: 402
            })));
        }
    }
    socket.user = await db.User.findByPk(userId)
    socket.chat = await db.Chat.findByPk(chatId)
    return next();

});


io.on('connection', (socket) => {
    socket.join(socket.chat.id)
    const {id, firstName, lastName, email, phone} = socket.user
    io.to(socket.id).emit('init-info', {chat: socket.chat, user: {id, firstName, lastName, email, phone}})
    socket.on('message', (data, callback) => {
        callback({
            status: '',
            reason: ""
        })
        io.to(socket.chat.id).emit('message', data)
    })
    if (socket.user.role === 'admin') {
        socket.on('block', (userId) => {


        });
        socket.on('unblock', (userId) => {


        });

    }
});


app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'app/index.html'));
});


server.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});



