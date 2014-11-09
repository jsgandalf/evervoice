
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

evervoice.controller('myCtrl', function($scope) {

  $scope.recognizing = false;

  $scope.startRecognition = function(){
    if(!window.webkitSpeechRecognition){
      alert('Try using Google Chrome.');
    } else {

      var recognition = new webkitSpeechRecognition();
      $scope.recognizing = true;
      recognition.lang = ['English', ['en-US', 'United States']];
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = function(e){
        console.log('Recognizing speech...');
      };

      recognition.onspeechend = function(e){
        console.log('Speech processed.');
        $scope.recognizing = false;
      };

      recognition.onresult = function(e){
        var interimTranscript = '';
        if (e.results.length) {
          for (var i = e.resultIndex; i < e.results.length; i++) {
            interimTranscript = e.results[i][0].transcript;
            console.log('Transcript: ', interimTranscript);
          }
        }

        $scope.$apply($scope.search = interimTranscript);

      };

      recognition.start();
      console.log('firing start');
    }
  };

});



