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
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        imageUrl: DataTypes.STRING,
        likes: DataTypes.INTEGER,
        usersLiked: DataTypes.JSON,
    }, 
    {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};