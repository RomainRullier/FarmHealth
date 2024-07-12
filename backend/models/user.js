'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'users',
  });
  User.associate = function(models) {
    User.hasMany(models.PlantAnalysis, {
      as: 'analyses',
      foreignKey: 'user_id'
    });
  };
  return User;
};