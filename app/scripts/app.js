
var evervoice = angular
  .module('evervoiceApp', [
    'ngAnimate',
    'ngSanitize'
  ]);

evervoice.controller('MainCtrl', ['$scope', function($scope) {

  var commands = {
      'new note': function() {

      }
  };

  annyang.addCommands(commands);
  annyang.start();

}]);
