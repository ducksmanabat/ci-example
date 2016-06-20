var questionEngineApp = angular.module('questionEngineApp', []);

questionEngineApp.controller('mainController', ['$scope', '$http', function($scope, $http) {

  $scope.getQuestion = function(questionId) {
    // get question
    $http.get('/question/' + questionId)
      .success(function(data) {
        $scope.question = data;
        $('.question').show();
      })
      .error(function(data) {
        console.log('error when getting question: ' + data);
      });
  }
  
}]);
