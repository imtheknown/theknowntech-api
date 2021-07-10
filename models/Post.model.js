'use strict';
module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
             required: true,
              allowNull: false
            },
        content: {
            type: DataTypes.STRING,
             required: true,
              allowNull: false
            },
        date: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false,
            default: Date.now()
        },
        author:{
            type: DataTypes.STRING,
            required: true,
            allowNull: false}
    }, {timestamps: false});

    Post.associate = function (models) {
        Post.belongsTo(models.User,{
            foreignKey:'authorId',
            onDelete:'CASCADE',
            as: 'user'
        });
    };

    return Post;
};