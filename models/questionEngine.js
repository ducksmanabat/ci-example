'use strict';
var DatabaseManager = require('../models/dataAccess');

function QuestionEngine() { }
module.exports = QuestionEngine;

const publicMethods = QuestionEngine.prototype;
publicMethods.createQuestion = function createQuestion(questionInputDto) {
  return DatabaseManager.getConnection().transaction(function(t) {

    return DatabaseManager.Question.create(questionInputDto, {transaction: t})
      .then((question) => {
        return question.updateQuestionChoices(questionInputDto.choices, t);
      });

  }).then(function() {
    console.log("transaction has been committed");
  }).catch(function(err) {
    console.log("transaction has been rolled back ", err);
  });
}

publicMethods.findQuestionWithQuestionId = function findQuestionWithQuestionId(questionId) {
  return DatabaseManager.getConnection().transaction(function(t) {
    return DatabaseManager.Question.find({
        where: { questionId: questionId },
        include: [DatabaseManager.QuestionChoice]
      });
  });
}
