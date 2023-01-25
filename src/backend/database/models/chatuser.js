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
            ChatUser.belongsTo(models.User, {
                foreignKey: 'by',
                as: 'statusBy'
            });

        }
    }

    ChatUser.init({
        status: DataTypes.ENUM('blocked', 'active', 'invited', 'reject_invitation'),
        // by: DataTypes.BIGINT,
        reason: DataTypes.STRING,
        // userId: DataTypes.BIGINT,
        // chatId: DataTypes.BIGINT,
    }, {
        sequelize,
        modelName: 'ChatUser',
    });
    return ChatUser;
};