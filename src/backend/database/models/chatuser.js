'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ChatUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            ChatUser.belongsTo(models.Chat);
            ChatUser.belongsTo(models.User);
        }
    }

    ChatUser.init({
        status: DataTypes.ENUM
    }, {
        sequelize,
        modelName: 'ChatUser',
    });
    return ChatUser;
};