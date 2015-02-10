$(function(){

  var totalBeats = 16;

  var hiHat = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  var kick = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  //timer stuff
  var beat = 1;

  function timer() {
    setInterval(fireBeat, 300);
  }

  function fireBeat() {
    var beatID = 'beat'+beat.toString();

    // console.log(beat);

    $('#'+beatID).addClass('on').siblings().removeClass('on');

    //what beat are we on does its correspondng position in the hihat array have a 1 or a 0
    //if it's a 1 trigger hihat sound

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

   $('.hihat li').click(function(){
    var beatPosition = $(this).attr('rel');
    
    $(this).toggleClass('on');

    if (hiHat[beatPosition-1] == 0) {
        hiHat[beatPosition-1] = 1;
    } else {
      hiHat[beatPosition-1] = 0;
    }
    console.log(hiHat);
   });


    $('.kick li').click(function(){
    var beatPosition = $(this).attr('rel');
    
    $(this).toggleClass('on');

    if (kick[beatPosition-1] == 0) {
        kick[beatPosition-1] = 1;
    } else {
      kick[beatPosition-1] = 0;
    }
    console.log(kick);
   });

  timer();


  //comments
  //refactor sequencer into array
  //fireBeat function is getting big
  //refactor beat numbers
  //refactor functions
  //change sequence to rel




});