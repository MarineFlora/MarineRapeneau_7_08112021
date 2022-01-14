'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class LikeComment extends Model {
        // Méthode pour définir les associations
        static associate(models) {
            LikeComment.belongsTo(models.User, { foreignKey: 'userId' })
            LikeComment.belongsTo(models.Post, { foreignKey: 'postId' }, { onDelete: 'cascade', hooks:true })
            LikeComment.belongsTo(models.Comment, { foreignKey: 'commentId' }, { onDelete: 'cascade', hooks:true })
        }
    };
    LikeComment.init({
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        commentId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        sequelize,
        modelName: 'LikeComment',
    }
    );
    return LikeComment;
};