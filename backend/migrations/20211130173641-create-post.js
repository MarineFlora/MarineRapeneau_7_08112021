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
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        description: {
            type: Sequelize.TEXT
        },
        imageUrl: {
            type: Sequelize.STRING
        },
        likes: {
            type: Sequelize.INTEGER
        },
        usersLiked: {
            type: Sequelize.JSON
        },
        commentsCount: {
            type: Sequelize.INTEGER
        },
        usersCommented: {
            type: Sequelize.JSON
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