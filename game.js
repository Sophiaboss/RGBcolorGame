var game = {}
game.numSquares= 6;
game.colors = [];
game.pickedColor;
game.squares=document.querySelectorAll(".square");
game.colorDisplay = document.getElementById("colorDisplay");
game.messageDisplay = document.querySelector("#message");
game.h1= document.querySelector("h1");
game.resetButton = document.querySelector("#reset");
game.modeButtons = document.querySelectorAll(".mode");
game.hideSquares = document.querySelectorAll(".easyHide");

game.init= function(){
  game.setUpModeBtns();
  game.initialSetColor();
  game.playAgain();
}

game.resetButton.addEventListener("click", function(){
  game.playAgain(game.numSquares);
});
//mode buttons event listenrs
game.setUpModeBtns= function(){
    for(var i=0; i<game.modeButtons.length;i++){
  game.modeButtons[i].addEventListener("click", function(){
    game.modeButtons[0].classList.remove("selected");
    game.modeButtons[1].classList.remove("selected");
    this.classList.add("selected");
    this.textContent === "Easy" ? game.numSquares =3: game.numSquares=6;
    game.playAgain();
  })
}
}

game.playAgain= function(){
    //generate all new colors
    game.colors=game.generateRandomColors(game.numSquares);
    //pick a new random color from array
    game.pickedColor = game.pickColor();
    //change display color to match
    game.colorDisplay.textContent= game.pickedColor;
    //change color of squares
    for(var i=0;i<game.squares.length; i++){
      if(game.colors[i]){
        game.squares[i].style.background = game.colors[i];
        game.squares[i].style.display = "unset";
      }else{
        game.squares[i].style.display = "none";
        }
      }
    game.h1.style.backgroundColor="steelblue";
    game.messageDisplay.textContent = ("");
    game.resetButton.textContent=  "New Colors";
};

game.initialSetColor=function(){
  for(var i=0; i<game.squares.length; i++){
  //add initial colors to square
  game.squares[i].style.background = game.colors[i];
  //add a listen button on squares+
  game.squareClick(game.squares[i]);
  
}};



game.squareClick=function(square){
  // add click listeners to squares
  square.addEventListener("click", function(){
    // grab color of clicked square
    game.clickedColor = square.style.backgroundColor;
    // compare square color to picked color
    if(game.clickedColor == game.pickedColor){
    // true change the message to correct
      game.messageDisplay.textContent = ("Correct!");
      // change all the square colors
      game.changeColors(game.squares);
      // change the background of the stripe
      game.h1.style.backgroundColor = game.clickedColor;
          //change button to say play again
      game.resetButton.textContent= "Play Again?"
    }else{
      //fade the quare
      square.style.backgroundColor = "#232323";
      // alert try again message
      game.messageDisplay.textContent = "Try Again";
    }
    
  })
};


game.changeColors=function(color){
  //loop through all sqaures
  for(var i=0;i<color.length;i++){
  //change each color to match given color
  color[i].style.backgroundColor=game.pickedColor;
  }
};

game.pickColor=function(){
  //pick the target color randomly
  game.random = game.randomNum(game.colors.length);
  return game.colors[game.random];
};

// document.getElementById('classRight').style.display = 'none';

game.generateRandomColors=function(num){
  //make an array
  game.arr = [];
  //add num random colors to array
  for(var i=0; i<num; i++){
    //get random color and push into array
    game.arr.push(game.randomColor())
  }
  //return array
  return game.arr;
};

game.randomNum=function(num){
  return Math.floor(Math.random()*num);
};

game.randomColor=function(){
  // pick a "red" from 0-255
  game.r = game.randomNum(256);
  // pick a "green" from 0-255
  game.g = game.randomNum(256);
  // pick a "blue" from 0-255
  game.b = game.randomNum(256);
  //return your new color
  return "rgb(" + game.r +", "+ game.g +", "+ game.b +")";
};

game.init()