$(function(){

  var totalBeats = 16;

  var hiHat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var kick = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  var kickObject = $('.kick li');
  var hiHatObject = $('.hihat li');

  //timer
  var beat = 1;

  function timer() {
    setInterval(fireBeat, 300);
  }

  function fireBeat() {
    var beatID = 'beat'+beat.toString();
    // console.log(beat);

    //add color
    $('#'+beatID).addClass('on').siblings().removeClass('on');

    //play sound
    if (hiHat[beat-1] == 1) {
      console.log('HIHAT');
      document.getElementById('hihat-sound').currentTime=0;
      document.getElementById('hihat-sound').play();
    }

    if (kick[beat-1] == 1) {
      console.log('KICK');
      document.getElementById('kick-sound').currentTime=0;
      document.getElementById('kick-sound').play();
    }

    beat++;
    if (beat > totalBeats) {
      beat = 1;
    }
  }

  timer();

  

  function triggerBeat(object, array) {

    $(object).click(function(){
      var beatPosition = $(this).attr('rel');

      $(this).toggleClass('on');

      if (array[beatPosition-1] == 0) {
          array[beatPosition-1] = 1;
      } else {
        array[beatPosition-1] = 0;
      }
      // console.log(kick);
   });

  }

  triggerBeat(kickObject, kick);
  triggerBeat(hiHatObject, hiHat);


  //comments
  //refactor sequencer into array
  //fireBeat function is getting big
  //refactor beat numbers
  //refactor functions
  //change sequence to rel




});