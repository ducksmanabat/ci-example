'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('QuestionChoice', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    choiceId: {
      type: DataTypes.INTEGER
    },
    text: {
      type: DataTypes.STRING
    }
  });
};
