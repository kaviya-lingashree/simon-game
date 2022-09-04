var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(){

  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;

}

$(".btn").on("click", function(event){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  console.log(userClickedPattern);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  var audio  = new Audio("sounds//"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  var activeButton = $("."+currentColour);
  activeButton.addClass("pressed");
  setTimeout(function(){
    activeButton.removeClass("pressed");
  }, 100);
}


$(document).on("keydown", function(){
  if(!started){

    nextSequence();
    started=true;

  }
});

function checkAnswer(currentLevel){
     if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
       console.log("success");
       if(userClickedPattern.length === gamePattern.length){
         setTimeout(function(){
           nextSequence();
         }, 1000);
         userClickedPattern = [];
       }


     }
     else{
       console.log("wrong");
       playSound("wrong");
       $("body").addClass("game-over");
       setTimeout(function(){
         $("body").removeClass("game-over");
       }, 200);
       $("#level-title").text("Game Over, Press Any Key to Restart");
       startOver();
     }
}

function startOver(){
  level=0;
  started=false;
  gamePattern = [];
  userClickedPattern = [];
}
