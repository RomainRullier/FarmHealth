const Sequelize = require('sequelize');
const config = require('../config/config.json').development;

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.PlantAnalysis = require('./plant_analysis')(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.PlantAnalysis, { as: 'analyses', foreignKey: 'user_id' });
db.PlantAnalysis.belongsTo(db.User, { as: 'user', foreignKey: 'user_id' });

module.exports = db;