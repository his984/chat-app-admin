const bcrypt = require("bcrypt");


exports.hashPassword = async function hashPassword(password) {
    return await bcrypt.hash(password, 12);
}

exports.validatePassword = async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword  );
}





