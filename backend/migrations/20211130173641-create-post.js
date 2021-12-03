'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Posts', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: ''
        },
        likesCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        usersLiked: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        commentsCount: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        usersCommented: {
            type: Sequelize.JSON,
            defaultValue: []
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Posts');
  }
};