'use strict';

const {hashPassword} = require("../../services/auth");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('NotAllowedMessages', Array.from({length: 10}).map((i, v) => {
            return {
                content: `bad ${v}`,
            }
        }), {})
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('NotAllowedMessages', null, {});
    }
};
