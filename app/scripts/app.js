
var evervoice = angular
  .module('evervoiceApp', [
    'ngAnimate',
    'ngSanitize'
  ]);


evervoice.controller('myCtrl', function($scope) {

  var commands = {

    'new note': function() {
      $scope.startRecognition();
      console.log('new note activated');
    },
    'save note': function() {
      console.log('save note activated');
    }
  };

  annyang.addCommands(commands);
  annyang.start();


  $scope.startRecognition = function(){

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

        $scope.interimTranscript;

      };
      recognition.start();
      console.log('firing start');
    };

});



