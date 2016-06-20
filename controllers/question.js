'use strict'
var QuestionEngine = require('../models/questionEngine.js');


module.exports =  {

  // GET /items/:id
  getQuestion: function(req, res) {
    new QuestionEngine().findQuestionWithQuestionId(req.params.id)
    .then((question)=> {
        res.json(question);
    }).catch(function (error) {
      res.status(500).json({msg: error.message});
    });
  },
}
