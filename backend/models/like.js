'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        // Méthode pour définir les associations
        static associate(models) {
            Like.belongsTo(models.User, { foreignKey: 'userId' })
            Like.belongsTo(models.Post, { foreignKey: 'postId' })
            Like.belongsTo(models.Comment, { foreignKey: 'commentId' })
        }
    };
    Like.init({
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
            allowNull: true
        }
    }, 
    {
        sequelize,
        modelName: 'Like',
    }
    );
    return Like;
};