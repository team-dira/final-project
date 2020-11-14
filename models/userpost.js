'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserPost.belongsTo(models.User);
    }
  }
  UserPost.init(
    {
      title: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'cannot be empty' }
        }
      },
      thumbnail_url: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'cannot be empty' }
        }
      },
      caption: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: { args: true, msg: 'cannot be empty' }
        }
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserPost',
    }
  );
  return UserPost;
};
