'use strict'
var assert = require('chai').assert;
var QuestionEngine = require('../models/questionEngine.js');
var QuestionInputDto = require('../models/questionInputDto.js');

var config = require('../config/config.json');
var DatabaseManager = require('../models/dataAccess');

suite('QuestionTests', function() {
  setup(function(){
    return DatabaseManager(config["test"]);
  });

  test('#createQuestion_PromiseAll', function(done) {
    // assemble
    var questionInputDto = new QuestionInputDto();
    questionInputDto.questionId = 1;
    questionInputDto.text = 'Do you like kittens?';
    questionInputDto.choices = ['Yes','No'];

    var questionEngine = new QuestionEngine();

    var act = questionEngine.createQuestion(questionInputDto);
    var find = questionEngine.findQuestionWithQuestionId(1);

    return Promise.all([act, find]).then((responses) => {
      var question = responses[1];
      assert.isOk(question);
      assert.equal(question.questionId, questionInputDto.questionId);
      assert.equal(question.text, questionInputDto.text);
      assert.equal(question.QuestionChoices[0].choiceId, 1);
      assert.equal(question.QuestionChoices[0].text, 'Yes');
      assert.equal(question.QuestionChoices[1].choiceId, 2);
      assert.equal(question.QuestionChoices[1].text, 'No');
      done();
    });
  });
});
