'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        // Méthode pour définir les associations
        static associate(models) {
            Post.belongsTo(models.User, { foreignKey: 'userId' })
            Post.hasMany(models.Comment) 
            Post.hasMany(models.Like)
        }
    };
    Post.init({
        userId: {
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
            type: DataTypes.JSON,
            defaultValue: []
        },
        commentsCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        usersCommented: {
            type: DataTypes.JSON,
            defaultValue: []
        }    
    }, 
    {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};