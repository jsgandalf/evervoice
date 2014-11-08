
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

evervoice.controller('myCtrl', function($scope, myService) {

console.log(myService);

});

evervoice.service('myService', function() {

  var final_transcript = '';
  var recognizing = false;

  if ('webkitSpeechRecognition' in window) {

    var recognition = new webkitSpeechRecognition();

    this.continuous = true;
    this.interimResults = true;

    this.onstart = function() {
      recognizing = true;
    };

    this.onerror = function(event) {
      console.log(event.error);
    };

    this.onend = function() {
      recognizing = false;
    };

    this.onresult = function(event) {
      var interim_transcript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final_transcript += event.results[i][0].transcript;
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      final_transcript = capitalize(final_transcript);
      final_span.innerHTML = linebreak(final_transcript);
      interim_span.innerHTML = linebreak(interim_transcript);

    };
    }

    var two_line = /\n\n/g;
    var one_line = /\n/g;
    function linebreak(s) {
      return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
    }

    function capitalize(s) {
      return s.replace(s.substr(0,1), function(m) { return m.toUpperCase(); });
    }

    function startDictation(event) {
      if (recognizing) {
        recognition.stop();
        return;
      }
      final_transcript = '';
      recognition.lang = 'en-US';
      recognition.start();
      final_span.innerHTML = '';
      interim_span.innerHTML = '';
    }

});
