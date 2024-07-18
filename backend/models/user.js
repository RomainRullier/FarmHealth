'use strict';
const bcrypt = require('bcryptjs');

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
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        console.log('Generated Salt:', salt);
        user.password_hash = await bcrypt.hash(user.password_hash, salt);
        console.log('Hashed Password:', user.password_hash);
      }
    }
  });

  User.associate = function(models) {
    User.hasMany(models.PlantAnalysis, {
      as: 'analyses',
      foreignKey: 'user_id'
    });
  };

  User.prototype.validPassword = async function(password) {
    console.log('Comparing password:', password);
    console.log('With stored hash:', this.password_hash);
    const isMatch = await bcrypt.compare(password, this.password_hash);
    console.log('Password comparison result:', isMatch);
    return isMatch;
  };

  return User;
};