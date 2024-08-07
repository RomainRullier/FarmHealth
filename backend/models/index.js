const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  dialectOptions: config.dialectOptions,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, Sequelize.DataTypes);
db.PlantAnalysis = require('./plant_analysis')(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.PlantAnalysis, { as: 'analyses', foreignKey: 'user_id' });
db.PlantAnalysis.belongsTo(db.User, { as: 'user', foreignKey: 'user_id' });

module.exports = db;