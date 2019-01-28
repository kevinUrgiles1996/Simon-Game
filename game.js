var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false;
var level = 0;
var points = 0;

$(document).keypress(function() {

  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
    $('.btn').show();

  }

});



$(".btnStart").bind("click", function() {

  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
    $('.btn').show();

  }


});

$(".btn").on("click", function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      points+= 5;

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").html("Game Over<br>😭");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
    $(".btn").hide();




  }

  $('.points').text("Points: " + points);

}

function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false


}
