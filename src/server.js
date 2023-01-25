const path = require('path');
const express = require('express');
const apiRouter = require("./backend/routes/api");
const {expressjwt: jwt} = require("express-jwt");
require("dotenv").config();
const {PORT = 3001} = process.env;

const app = express();

// Middleware that parses json and looks at requests where the Content-Type header matches the type option.
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
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'app/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
