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
        userId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        imageUrl: DataTypes.STRING,
        likesCount: DataTypes.INTEGER,
        usersLiked: DataTypes.JSON,
        commentsCount: DataTypes.INTEGER,
        usersCommented: DataTypes.JSON
    }, 
    {
        sequelize,
        modelName: 'Post',
    });
    return Post;
};