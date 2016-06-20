var Router = require('express').Router;
var questionController = require('../controllers/question');

module.exports = function () {
  var router = Router();
  router.get('/question', questionController.getQuestion);
  // router.get('/items/:id', itemsController.getItem);
  // router.post('/items', itemsController.saveItem);
  return router;
};
