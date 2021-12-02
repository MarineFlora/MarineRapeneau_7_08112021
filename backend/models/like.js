'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        // Méthode pour définir les associations
        static associate(models) {
            Like.belongsTo(models.User, { foreignKey: 'userId' })
            Like.belongsTo(models.Post, { foreignKey: 'postId' })
        }
    };
    Like.init({
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER
    }, 
    {
        sequelize,
        modelName: 'Like',
    }
    );
    return Like;
};