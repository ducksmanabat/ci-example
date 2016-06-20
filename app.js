'use strict'
var express = require('express');
var app = express();

var port = process.env.PORT || 8080;

var config = require('./config/config.json');
var DatabaseManager = require('./models/dataAccess');

var questionController = require('./controllers/question');
var QuestionEngine = require('./models/questionEngine.js');
var QuestionInputDto = require('./models/questionInputDto.js');

app.use(express.static('./views/public'));
app.route('/question/:id').get(questionController.getQuestion);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(port, function () {
  console.log('Server listening on port: ' + port);
  return DatabaseManager(config["dev"])
  .then(function(){
    var questionInputDto = new QuestionInputDto();
    questionInputDto.questionId = 1;
    questionInputDto.text = 'Do you like kittens?';
    questionInputDto.choices = ['Yes','No'];

    return new QuestionEngine().createQuestion(questionInputDto);
  });
});
