$(function(){

  var totalBeats = 16;
  var hiHat = [];
  var kick = [];
  var bpm = 120;
  var speed = (60000 / bpm);


  function init() {
    for(var i = 0; i < totalBeats; i++) {
      hiHat.push(0);  
      kick.push(0);

      generateSquares('.kick', i);
      generateSquares('.hihat', i);
    }
    //start the sequencer
    // var timeout = setInterval(fireBeat, speed);
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

  //timer
  var beat = 0;

  function fireBeat() {
    var beatID = 'beat'+beat.toString();
    // console.log(beat);

    //add color
    $('#'+beatID).addClass('on').siblings().removeClass('on');

    //play sound
    if (hiHat[beat] == 1) {
      // console.log('HIHAT');
      document.getElementById('hihat-sound').currentTime=0;
      document.getElementById('hihat-sound').play();
    }

    if (kick[beat] == 1) {
      // console.log('KICK');
      document.getElementById('kick-sound').currentTime=0;
      document.getElementById('kick-sound').play();
    }

    beat++;
    if (beat > totalBeats-1) {
      beat = 0;
    }
  }

  var kickSquare = $('.kick td');
  var hiHatSquare = $('.hihat td');

  function selectBeat(soundSquare, array) {
    $(soundSquare).click(function(){
      var squarePosition = $(this).attr('rel');

      $(this).toggleClass('on');

      if (array[squarePosition] == 0) {
          array[squarePosition] = 1;
      } else {
        array[squarePosition] = 0;
      }
      // console.log(array);
   });
  }

  selectBeat(kickSquare, kick);
  selectBeat(hiHatSquare, hiHat);


  //comments
  //refactor sequencer into array
  //fireBeat function is getting big
  //change sequence to rel


});