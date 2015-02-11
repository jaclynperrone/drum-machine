$(function(){

  var totalBeats = 16;
  // var hiHat = [];
  // var kick = [];
  // var snare = [];
  var bpm = 120;
  var speed = (60000 / bpm);

  var Sound = function(audioFileID, pattern) {
    var self = this;
    self.audioFileID = audioFileID;
    self.pattern = pattern;
    self.audioElement = document.getElementById(self.audioFileID);

    self.play = function(){
      console.log(self.audioElement);
      self.audioElement.currentTime = 0;
      self.audioElement.play();
    }

    self.toggleSound = function(status) {
      if (self.pattern[status] == 0) {
        self.pattern[status] = 1;
      } else {
        self.pattern[status] = 0;
      }
    }
  }

  var kick = new Sound('kick-sound', []);

  function init() {
    for(var i = 0; i < totalBeats; i++) {
      // hiHat.push(0);  
      kick.pattern.push(0);
      // snare.push(0);

      generateSquares('.kick', i);
      // generateSquares('.hihat', i);
      // generateSquares('.snare', i);
    }
    //start the sequencer
    startTimer(speed);
  }

  
  function generateSquares(element, i) {
    $(element).append('<td rel="'+i+'"></td>');
  }

  var timer;

  function startTimer(speed) {
    timer = setInterval(fireBeat, speed);
  }

  function clearTimer() {
    clearTimeout(timer);
  }

  $('#set-bpm').change(function(){
    bpm = $(this).val();
    speed = (60000 / bpm);

    clearTimer();
    startTimer(speed);
    // console.log(bpm);
    // console.log(speed);
  });

  init();
  // kick.selectSound();

$('.kick td').click(function(){
  var squarePosition = $(this).attr('rel');
  $(this).toggleClass('on');
  kick.toggleSound(squarePosition);
  console.log(kick.pattern);
});
  //timer
  var beat = 0;

  function fireBeat() {
    var beatID = 'beat'+beat.toString();
    // console.log(beat);

    //add color
    $('#'+beatID).addClass('on').siblings().removeClass('on');

    //play sound
    // if (hiHat[beat] == 1) {
    //   // console.log('HIHAT');
    //   document.getElementById('hihat-sound').currentTime=0;
    //   document.getElementById('hihat-sound').play();
    // }

    if (kick.pattern[beat] == 1) {
      kick.play();
      // document.getElementById('kick-sound').currentTime=0;
      // document.getElementById('kick-sound').play();
    }
    // if (snare[beat] == 1) {
    //   // console.log('KICK');
    //   document.getElementById('snare-sound').currentTime=0;
    //   document.getElementById('snare-sound').play();
    // }

    beat++;
    if (beat > totalBeats-1) {
      beat = 0;
    }
  }

  // var kickSquare = $('.kick td');
  // var hiHatSquare = $('.hihat td');
  // var snareSquare = $('.snare td');

  // function selectBeat(soundSquare, array) {
  //   $(soundSquare).click(function(){
  //     var squarePosition = $(this).attr('rel');

  //     $(this).toggleClass('on');

  //     if (array[squarePosition] == 0) {
  //         array[squarePosition] = 1;
  //     } else {
  //       array[squarePosition] = 0;
  //     }
  //     // console.log(array);
  //  });
  // }

  
  // selectBeat(hiHatSquare, hiHat);
  // selectBeat(snareSquare, snare);


  //comments
  //refactor sequencer into array
  //fireBeat function is getting big
  //change sequence to rel


});