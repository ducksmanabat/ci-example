'use strict';
var DatabaseManager = require('../models/dataAccess');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    questionId: {
      type: DataTypes.INTEGER
    },
    text: {
      type: DataTypes.STRING
    }
  }, {
    instanceMethods: {
      updateQuestionChoices: function(choiceTexts, transaction) {
        var choiceId = 1;
        var createQuestionChoices = choiceTexts.map((choiceText) => {
          return DatabaseManager.QuestionChoice.create({choiceId: choiceId++, text: choiceText, QuestionId: this.id }, {transaction: transaction});
        });
        return Promise.all(createQuestionChoices);
      }
    }
  });
};
