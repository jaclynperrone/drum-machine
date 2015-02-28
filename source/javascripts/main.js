$(function(){

  var totalBeats = 16;
  var bpm = 120;
  var speed = (60000 / (2*bpm));

  var Sound = function(audioFileID, pattern) {
    var self = this;
    self.audioFileID = audioFileID;
    self.pattern = pattern;
    self.audioElement = document.getElementById(self.audioFileID);

    self.play = function(){
      // console.log(self.audioElement);
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
  var hihat = new Sound('hihat-sound', []);
  var snare = new Sound('snare-sound', []);
  var cymbal = new Sound('cymbal-sound', []);

  function init() {
    for(var i = 0; i < totalBeats; i++) {
      hihat.pattern.push(0);  
      kick.pattern.push(0);
      snare.pattern.push(0);
      cymbal.pattern.push(0);

      generateSquares('.kick', i);
      generateSquares('.hihat', i);
      generateSquares('.snare', i);
      generateSquares('.cymbal', i);
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
    speed = (60000 / (2*bpm));

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
  // console.log(kick.pattern);
});

$('.snare td').click(function(){
  var squarePosition = $(this).attr('rel');
  $(this).toggleClass('on');
  snare.toggleSound(squarePosition);
  // console.log(kick.pattern);
});

$('.hihat td').click(function(){
  var squarePosition = $(this).attr('rel');
  $(this).toggleClass('on');
  hihat.toggleSound(squarePosition);
  // console.log(kick.pattern);
});

$('.cymbal td').click(function(){
  var squarePosition = $(this).attr('rel');
  $(this).toggleClass('on');
  cymbal.toggleSound(squarePosition);
  // console.log(kick.pattern);
});

  //timer
  var beat = 0;

  function fireBeat() {
    var beatID = 'beat'+beat.toString();
    // console.log(beat);

    $('#'+beatID).addClass('on').siblings().removeClass('on');

    if (hihat.pattern[beat] == 1) {
      hihat.play();
    }

    if (kick.pattern[beat] == 1) {
      kick.play();
    }

    if (snare.pattern[beat] == 1) {
      snare.play();
    }

    if (cymbal.pattern[beat] == 1) {
      cymbal.play();
    }

    beat++;
    if (beat > totalBeats-1) {
      beat = 0;
    }
  }

  $('#btn-mute').change(function(){
    if ($(this).is(':checked')) {
      $('audio').prop('muted', true);
    } else {
      $('audio').prop('muted', false);
    }
  });

});