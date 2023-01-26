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

    const query = {
        where: {
            id: req.params.chatId,
        },
        attributes: ['id', 'subject']
    };

    if (role !== 'admin') {
        query['include'] = [];
        query['include'].push({
            model: db.ChatUser,
            where: {
                'userId': req.auth.userId,
                'status': {[Op.in]: ['active', 'invited']}
            },
            attributes: []
        })
        query['include'].push({
            model: db.User,
            as: 'owner',
            attributes: ['firstName', 'lastName', 'email', 'id']
        })
    }


    res.json(await db.Chat.findOne(query))
}

exports.getChats = async (req, res) => {
    const page = Math.max((req.query.page ?? 1) - 1, 0);
    const role = req.auth.role;
    const query = {
        offset : page ,
        limit : 10 ,

    };

    if (role !== 'admin') {
        query['include'] = [];
        query['include'].push({
            model: db.ChatUser,
            where: {
                'userId': req.auth.userId,
                'status': 'active'
            },
            attributes: []
        })
        query['include'].push({
            model: db.User,
            as: 'owner',
            attributes: ['firstName', 'lastName', 'email', 'id']
        })
    }
    const result = await db.Chat.findAndCountAll(query);
    result.rows = result.rows.map(({id, subject, owner}) => {
        return {id, subject, owner};
    })
    res.json(result)


}
exports.getInvitations = async (req, res) => {
    const page = Math.max((req.query.page ?? 1) - 1, 0);
    const role = req.auth.role;
    const query = {
        offset : page ,
        limit : 10 ,

    };

    if (role !== 'admin') {
        query['include'] = [];
        query['include'].push({
            model: db.ChatUser,
            where: {
                'userId': req.auth.userId,
                'status': 'invited'
            },
            attributes: []
        })
        query['include'].push({
            model: db.User,
            as: 'owner',
            attributes: ['firstName', 'lastName', 'email', 'id']
        })
    }
    const result = await db.Chat.findAndCountAll(query);
    result.rows = result.rows.map(({id, subject, owner}) => {
        return {id, subject, owner};
    })
    res.json(result)
}

