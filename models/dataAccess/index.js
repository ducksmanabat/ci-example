'use strict';
var Sequelize = require('sequelize');

var _sequelize;

// Private
function _authenticate(){
  return _sequelize
    .authenticate()
    .then(function(err) {
      console.log('Connection has been established successfully.');
    }, function (err) {
      console.log('Unable to connect to the database:', err);
    });
}

function _buildSchema(){
  // mappings
  var Question = _sequelize.import(__dirname + '/../question');
  var QuestionChoice = _sequelize.import(__dirname + '/../questionChoice');

  Question.hasMany(QuestionChoice);
  QuestionChoice.belongsTo(Question);

  module.exports.Question = Question;
  module.exports.QuestionChoice = QuestionChoice;

  return _sequelize
    .sync({ force: true })
    .then(function(){
      console.log('Schema successfully created');
    });
}

function DatabaseManager(config) {
  _sequelize = new Sequelize(config.database, config.username, config.password, {
      host: config.host,
      port: config.port,
      dialect: config.driver
    });
  return _authenticate()
    .then(function(){
        return _buildSchema();
    });
};

// Public
DatabaseManager.getConnection = function() {
  return _sequelize;
}

// Export class
module.exports = DatabaseManager;
