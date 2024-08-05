var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userPattern = [];
var newGame = true;
var level = 0;

//FUNCTIONS

//Progress Game
function nextSequence() {
    userPattern.length = 0;
    console.log(userPattern);
    console.log("Next Level");
    level++;
    console.log(level);
    //H1 Updater
    if (level === 0) {
        $("h1").text("Press A Key to Start");
    } else {
        var h1String = "Level " + level;
        $("h1").text(h1String);
    } 
    //Create Random Number
    var randomNumber = Math.floor(Math.random()*4);
    //Assign Color to Random Number
    var randomColor = buttonColors[randomNumber];
    //Push Color to Game Pattern
    gamePattern.push(randomColor);
    console.log("Game Pattern");
    console.log(gamePattern);
    //Find Associated Button
    var searchButton = "#" + randomColor;
    //Animate Button Based on Random Color
    $(searchButton).animate({opacity: 0}).animate({opacity: 1});
    //Create Sound Based on Random Color
    var strGameAudio = "./sounds/" + randomColor + ".mp3";
    var gameAudio = new Audio(strGameAudio);
    gameAudio.play();
}

//Press Animation
function animatePress(currentColor) {
    var colorSelector = "#" + currentColor;
    $(colorSelector).addClass("pressed");
    setTimeout(function(){
        $(colorSelector).removeClass("pressed");
    }, 100);
}

//Game Over
function gameOver() {
    //Animation
    $("body").addClass("game-over")
    setTimeout(function(){
    $("body").removeClass("game-over");
    }, 100);
    //Logic
    level = 0;
    $("h1").text("Game Over, Press any Key to Restart");
    gamePattern.length = 0;
    userPattern.length = 0;
}

//Check Array Position
function arrayChecker(position) {
    if (gamePattern[position] === userPattern[position]) {
        return true;
    }else {
        return false;
    }
}

//EVENT LISTENERS

//User Click Input
$(".btn").click(function () {
    if (level > 0){
        console.log("Click Detected");
        //Find Color From Click
        var userSelectedColor = this.id;
        //Push Color to User Array
        userPattern.push(userSelectedColor);
        console.log("User Pattern");
        console.log(userPattern); 
        //Animate Button
        animatePress(userSelectedColor);
        //Create Sound
        var strClickSound = "./sounds/" + userSelectedColor + ".mp3";
        var clickSound = new Audio(strClickSound);
        clickSound.play();

        //GAME LOGIC
        
        if (arrayChecker((userPattern.length) - 1)) {
            if (userPattern.length === gamePattern.length){
                nextSequence();
            }
        }else {
            gameOver();
        }
    } else {
        console.log("Game not Started");
    }
});

//User Key Input
$(document).on("keypress", function () {
    if (level === 0) {
        console.log("Game Started!");
        nextSequence();
    } else {
        console.log("Game Already Started");
    }
});

