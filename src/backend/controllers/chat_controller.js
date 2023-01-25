const db = require("../database/models");
const {Op} = require("sequelize");
exports.createChat = async (req, res) => {
    const {selectedUsers, subject} = req.body;
    const userId = req.auth.userId;

    selectedUsers.push(userId)
    const chat = await db.Chat.create({subject, createdBy: userId})
    await db.ChatUser.bulkCreate(selectedUsers.map(id => {
        return {
            status: id === userId ? 'active' : 'invited',
            userId: id,
            by: userId,
            chatId: chat.id,
        }
    }));
    res.json({
        data: chat
    })

}


exports.getChat = async (req, res) => {

    const role = req.auth.role;
    const where = {
        id: req.params.chatId,
    };

    if (role !== 'admin') {
        where['ChatUsers.userId'] = req.auth.userId;
        where['ChatUsers.status'] = {[Op.in]: ['active', 'invited']};
    }

    res.json(await db.Chat.findOne({
        where, include: 'owner'
    }))
}

exports.getChats = async (req, res) => {

    const role = req.auth.role;
    const where = {
        id: req.params.chatId,
    };

    if (role !== 'admin') {
        where['ChatUsers.userId'] = req.auth.userId;
        where['ChatUsers.status'] = 'active';
    }
    res.json(await db.Chat.findAll({
        where, include: 'owner'
    }))


}
exports.getInvitations = async (req, res) => {

    const role = req.auth.role;
    const where = {
        id: req.params.chatId,
    };

    if (role !== 'admin') {
        where['ChatUsers.userId'] = req.auth.userId;
        where['ChatUsers.status'] = 'invited';
    }
    res.json(await db.Chat.findAll({
        where, include: 'owner'
    }))
}

