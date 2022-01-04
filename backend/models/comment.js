'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        // Méthode pour définir les associations
        static associate(models) {
            Comment.belongsTo(models.User, { foreignKey: 'userId' }) 
            Comment.belongsTo(models.Post, { foreignKey: 'postId' }) 
        }
    };
    Comment.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        imageUrl: { 
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        likesCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        usersLiked: {
            type: DataTypes.TEXT,
            defaultValue: ''
        }
    }, 
    {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};