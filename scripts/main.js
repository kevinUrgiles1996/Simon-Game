var gameColors = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickPattern = [];
var level = 0;
var started = false;
var points = 0;


$('.btnStart').on('click',function(){

  if (!started){

    $('.btn').show();

    setTimeout(function(){
      nextSequence();
      $('.btnStart').hide();
      $('.points').text('Points: ' + points);
      started = true;
    },300);


  }

});

function checkAnswer(currentLevel){

   if(gamePattern[currentLevel] === userClickPattern[currentLevel]){

     points += 5;
     $('.points').text('Points: ' + points);


     if(gamePattern.length === userClickPattern.length){
       setTimeout(function(){nextSequence()},1000);

     }

   }

   else{
     $('body').addClass('game-over');

     setTimeout(function(){
      $('body').removeClass('game-over');
      playSound('wrong');
    },300);
     $('.points').html('Game Over <br><br> Points: ' + points);
     $('.btn').hide();
     resetGame();
     $('.btnStart').show();
   }
}

function nextSequence(){

  userClickPattern = [];
  level++;
  $('#title-game').text('Level ' + level);
  var randomNumber = Math.floor(Math.random()*4);
  var color = gameColors[randomNumber];
  gamePattern.push(color);
  $("#" + color).fadeOut(100).fadeIn(100);
  playSound(color);


}



$('.btn').on('click', function(event){

  var userColor = this.id;
  userClickPattern.push(userColor);

  playSound(userColor);
  animatePress(userColor);
  checkAnswer(userClickPattern.length - 1);

});

function resetGame(){

  level = 0;
  started = false;
  gamePattern = [];
  points = 0;

}


function playSound(audioName){
  var audio = new Audio('sounds/' + audioName + '.mp3');
  audio.play();
}

function animatePress(currentColor){
  $('#' + currentColor).addClass('pressed');
  setTimeout(function(){
    $('#' + currentColor).removeClass('pressed');
  },200);
}
