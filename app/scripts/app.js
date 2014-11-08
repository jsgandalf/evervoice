
var evervoice = angular
  .module('evervoiceApp', [
    'ngAnimate',
    'ngSanitize'
  ]);

//evervoice.controller('CommandCtrl', ['$scope', function($scope) {

  //var commands = {
    //  'new note': function() {
      //  console.log('new note activated');
     // },
    //  'save note': function() {
      //  console.log('save note activated');
     // },
   //   'what *term do you like': function() {
    //    alert('Whatever you like!');
   //   }
  //};

  //annyang.addCommands(commands);
  //annyang.start();

//}]);

evervoice.directive('recordVoice', function() {
  return {
    restrict: 'E',
    controller: function($scope) {
      console.log('firing directive');
    }
  };
});
