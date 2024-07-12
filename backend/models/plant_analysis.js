'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlantAnalysis = sequelize.define('PlantAnalysis', {
    plant_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image_url: {
      type: DataTypes.STRING
    },
    treatment_validated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'plant_analysis',
  });
  PlantAnalysis.associate = function(models) {
    PlantAnalysis.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
  };
  return PlantAnalysis;
};