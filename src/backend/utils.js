const jwt = require("jsonwebtoken");


exports.isValidToken = (token) => {
    try {
        return  jwt.verify(token,  process.env.JWT_SECRET);
    } catch(err) {
        console.log(err)
        return false;
    }
}