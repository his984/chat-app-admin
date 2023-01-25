const bcrypt = require("bcrypt");
const {roles} = require("../roles");

exports.hashPassword = async function hashPassword(password) {
    return await bcrypt.hash(password, 12);
}

exports.validatePassword = async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword  );
}

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "You don't have enough permission to perform this action"
                });
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}



