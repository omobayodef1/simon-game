var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


// game pattern
function nextSequence() {
//Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
   userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  
    playSound(randomChosenColour);
  }

// user pattern
$(".btn").click (function clickecButton() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   
    playSound(userChosenColour);
    animatePress(userChosenColour);

//Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1)
})

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function  animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout( function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}


// Use jQuery to detect when h1 has been clicked, when that happens for the first time, call nextSequence().
$("h1").click(function() {
    if (!started) {
//The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0"
    $("#level-title").text("Level " + level);
    $("#para").addClass("hidden");
    $("#level-title").addClass("gap");
      nextSequence();
      started = true;
    }
  });

  

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

       

        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);

        }
    }
    else{
        $("#level-title").text("Game Over, Click Me to Start");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        
        playSound("wrong");
        startOver();
    }
    
}

function startOver(){
   level = 0;
   gamePattern = [];
   started = false;
}