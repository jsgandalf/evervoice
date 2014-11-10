
var evervoice = angular
  .module('evervoiceApp', [
    'ngAnimate',
    'ngSanitize'
  ]);


evervoice.controller('myCtrl', function($scope) {

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
      for (var i = e.resultIndex; i < e.results.length; i++) {
        $scope.interimTranscript = e.results[i][0].transcript;
        console.log('Transcript: ', $scope.interimTranscript);
      }
      $scope.$apply(interimTranscript);
    };
    recognition.start();
  }
});



