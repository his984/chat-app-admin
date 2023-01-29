'use strict';

const {hashPassword} = require("../../services/auth");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', Array.from({length: 10}).map((i, v) => {
            return {
                firstName: `Admin`,
                lastName: `admin ${v}`,
                email: `admin${v}@admin.com`,
                phone: `12345678${v}`,
                role: 'admin',
                password: hashPassword('P@ssw0rd')

            }
        }), {})
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {
        });
    }
};
