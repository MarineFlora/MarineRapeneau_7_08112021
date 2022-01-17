'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LikePost extends Model {
        // Méthode pour définir les associations
        static associate(models) {
            LikePost.belongsTo(models.User, { foreignKey: 'userId' }, { onDelete: 'cascade', hooks:true })
            LikePost.belongsTo(models.Post, { foreignKey: 'postId' }, { onDelete: 'cascade', hooks:true })
        }
    };
    LikePost.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        sequelize,
        modelName: 'LikePost',
    }
    );
    return LikePost;
};