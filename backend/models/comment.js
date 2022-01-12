'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        // Méthode pour définir les associations
        static associate(models) {
            Comment.belongsTo(models.User, { foreignKey: 'userId' }) 
            Comment.belongsTo(models.Post, { foreignKey: 'postId' }, { onDelete: 'cascade', hooks:true }) 
            Comment.hasMany(models.LikeComment)
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
        likesCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, 
    {
        sequelize,
        modelName: 'Comment',
    });
    return Comment;
};