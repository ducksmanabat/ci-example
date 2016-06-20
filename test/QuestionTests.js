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


  // we will now write a new test and run it locally to see if it works
  // tests passed :)
  // we will now setup travis ci to automatically run our tests when we check into the repo
  

    test('#createQuestion', function(done) {
      // assemble
      var questionInputDto = new QuestionInputDto();
      questionInputDto.questionId = 1;
      questionInputDto.text = 'Do you like kittens?';
      questionInputDto.choices = ['Yes','No'];

      var questionEngine = new QuestionEngine();

      var createQuestion = questionEngine.createQuestion(questionInputDto);
      var findQuestion = questionEngine.findQuestionWithQuestionId(1);

      // act
      return createQuestion.then(findQuestion.then((question)=> {
        // asserts
        assert.isOk(question);
        assert.equal(question.questionId, questionInputDto.questionId);
        assert.equal(question.text, questionInputDto.text);
        assert.equal(question.QuestionChoices[0].choiceId, 1);
        assert.equal(question.QuestionChoices[0].text, 'Yes');
        assert.equal(question.QuestionChoices[1].choiceId, 2);
        assert.equal(question.QuestionChoices[1].text, 'No');
        done();
      }));
    });



});
