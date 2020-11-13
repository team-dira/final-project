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
      title: DataTypes.STRING,
      thumbnail_url: DataTypes.STRING,
      caption: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserPost',
    }
  );
  return UserPost;
};
