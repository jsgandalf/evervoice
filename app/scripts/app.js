
var evervoice = angular
  .module('evervoiceApp', ['firebase']);






evervoice.controller('myCtrl', ['$scope', 'voiceRecord', '$firebase', function($scope, voiceRecord, $firebase) {

/////////////////// Text Box ////////////////////

  voiceRecord.setListener(function(value) {
    $scope.$apply(function() {
      $scope.interimTranscript = value;
      console.log('Transcript: ', $scope.interimTranscript);
      });
    });

//////////////////// Dictate Button ////////////////////

  $scope.dictate = function() {
    voiceRecord.startRecognition();
  };

/////////////////// Evernote Button ////////////////////

  var ref = new Firebase('https://evervoice.firebaseio.com/');
  var sync = $firebase(ref);

// Place note in an array
  $scope.note = sync.$asArray();

 // Adding note to database

  $scope.addNote = function() {
    $scope.note.$add({
      note: $scope.interimTranscript
    });

  };

}]);




evervoice.service('voiceRecord', function() {

  var recognitionListener;

  return {

    setListener: function(listen) {
      recognitionListener = listen;
    },

    startRecognition: function () {

      var recognition = new webkitSpeechRecognition();
      var recognizing = true;
      recognition.lang = ['English', ['en-US', 'United States']];
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onstart = function (e) {
        console.log('Recognizing speech...');
      };

      recognition.onspeechend = function (e) {
        console.log('Speech processed.');
        recognizing = false;
      };

      recognition.onresult = function (e) {
        var interimTranscript = '';
        for (var i = e.resultIndex; i < e.results.length; i++) {
          interimTranscript = e.results[i][0].transcript;
          if(recognitionListener)  {
            recognitionListener(interimTranscript);
          }
        }
      };
      recognition.start();
    }
  };

});



