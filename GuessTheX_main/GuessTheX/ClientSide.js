//inputted variables
var myName;
var inputNum;
//variables received from evaluate action
var correct;
var num_Attempts;
var num_Correct;
var num_HighestCorrectRow
var points;
var randomNum;
//variables to set the input number max min depending on the level
var level;
var max;
var min;

// used for the highscore screen
var easy_HighestCorrectRow=0;
var easy_points=0;

var medium_HighestCorrectRow=0;
var medium_points=0;

var hard_HighestCorrectRow=0;
var hard_points=0;

//variables used for the hints
var showHints = false;
var hint;

var url = "http://localhost:2000/post";



window.onload = function()
{
  homepage_screen()  //draw the hompage screen

  //call prompt to ask name    
    myName = prompt("Please enter your name", "");
   // $('#name').text(myName);

   
   $("h2").text("Welcome " + myName +", to the twisting game of Guess the X! Test yourself and see if it's your lucky day! Start by checking out the instructions and click start when your ready.");

    
}

//function to check if the user wsnts hints or not
function hintCheck(){

  if (document.getElementById("hints").checked==true) {
    showHints = true;
  }
  else {
  showHints = false;   
  }
  
}

// stores the highscores for the highscore page at the end of the game
function storeHighscore(){
  
  if(level == 'easy'){
    if(num_HighestCorrectRow>easy_HighestCorrectRow)
    {
      easy_HighestCorrectRow = num_HighestCorrectRow;
      easy_points = points;
    }
  }else if(level == 'medium'){
    if(num_HighestCorrectRow>medium_HighestCorrectRow)
    {
      medium_HighestCorrectRow = num_HighestCorrectRow;
      medium_points = points;
    }
  }else if(level == 'hard'){
    if(num_HighestCorrectRow>hard_HighestCorrectRow)
    {
      hard_HighestCorrectRow = num_HighestCorrectRow;
      hard_points = points;
    }
  }
}


///////////////////////////////////////////////
//////////////Functions/////////////
///////////////////////////////////////////////
//function to call the server to generate a random number
function generateNumber(){

  //send request to server to start a new game.
  $.post(url+'?data='+JSON.stringify({
    'name':myName, //client's identity on the server
    'action':'generateRandNum',
    'level':level}),
response);

}

//function to call the server
function evaluateNumber(){

  //The user has started to play the game so thier scores will be outputted at the end now
  $("#homepage").css("visibility", "hidden");
  $("#exit").css("visibility", "visible");

  
  inputNum = parseInt(document.getElementById("num").value); //stores input
  
 
  if(inputNum==0) //checks if input is 0 that means user wants to end the game
  {

    exitButton(); 


  } else if(min<=inputNum & inputNum<=max){ //if the input is within the min max of level the input is evaluated

    $.post(url+'?data='+JSON.stringify({
      'name':myName, 
      'action':'evaluate', 
      'inputNum':inputNum, 
      'level':level,
      'showHints':showHints
      }),
      response
    );

    // hide the btn to wait for server's response
    $("#enter").css("visibility", "hidden");

  } else{
    alert("Please enter a valid number for the level!")
  }

}

// function when the user wants to exit
function exitButton(){

  
  $("#enter").css("visibility", "hidden"); // enter button is hidden so game is stopped

  inputNum = 0;

  $.post(url+'?data='+JSON.stringify({
    'name':myName, 
    'action':'exit'
    }),
    response
  );

}

//Servers response
function response(data, status){

  var response = JSON.parse(data);
  console.log(data);
 
  if (response['action'] == 'generateRandNum'){

      //action: generateRandNum
      myName = response['nameID'];   

      //visible button prompting user to start attempt
      $("#enter").css("visibility", "visible");

      
      
  } else if (response['action'] == 'evaluate'){ 
      // action: Evaluate
      // after receiving the server's response, then make the button visible
      $("#enter").css("visibility", "hidden");
      
      //read data from the json object that send back from the server
       correct = response['correct'];
       inputNum = response['inputNum'];
       num_Attempts = response['num_Attempts'];
       num_Correct = response['num_Correct'];
       num_HighestCorrectRow = response['num_HighestCorrectRow'];
       points = response['points'];
       randomNum = response['randomNum'];
       hint = response['hint'];
      

      if(correct == true) // if the input is true
      {
        //display following to h4
        $("h4").text("Your guess of " + inputNum + " was "+ correct  +" . Guess the next number!");
        generateNumber() // generate new random
      }
      else{

        if(showHints == false){ // if hints are not turned on display the following message
          $("h4").text("Your guess of " + inputNum + " was "+ correct + ". Keep trying!!!");
        }else{ // if hints is turned on than the hint message given from the server will be displayed
          $("h4").text(hint);
        }
        
      }

        //button appears 
      $("#enter").css("visibility", "visible");
     


  } else if (response['action'] == 'exit'){
    // action: exit
    // display the congratulations message

    $("h4").text("Congratulations "+ myName + ", in " + num_Attempts + " attempts you got a total of "+ num_Correct + " correct. From the total correct, you got " + num_HighestCorrectRow + " correct in a row, which gives you a score of " + points + " points!");
      
    // let the user know about the homepage button
    alert("Click the homepage button to return to the homepage after viewing your score!"); 
  
    //exit button dissapears and homepage button appears so use can go back to home
    $("#exit").css("visibility", "hidden");
    $("#homepage").css("visibility", "visible");

    storeHighscore()
    
  

  }
      
      
}




///////////////////////////////////////////////
//////////////Draw different pages/////////////
///////////////////////////////////////////////
//using the visibility and changing the css at minimum during runtime to change the screens dynamically

  //Draw homepage screen
function homepage_screen(){
  //visibility of buttons
  $("#start").css("visibility", "visible");
  $("#instructions").css("visibility", "visible");
  $("#highscores").css("visibility", "visible");
  $(".dropdown").css("visibility", "visible");
  $("#homepage").css("visibility", "hidden");
  $("#exit").css("visibility", "hidden");
  $("#easy").css("visibility", "hidden");
  $("#medium").css("visibility", "hidden");
  $("#hard").css("visibility", "hidden");
  $("#enter").css("visibility", "hidden");
  
  $("img").css("visibility", "hidden");
 // $(".dropdown").css("size", "30px");

  //visibility of text
  $("h1").css("visibility", "visible");
  $("h1").text("Guess The X!!!");

  $("h2").css("visibility", "visible");
  $("h2").css("height", "30%");
  $("h2").text("It's a guessing game, so keep guessing until you can't anymore! Goodluck " + myName + "!");

  $("h3").css("visibility", "hidden");
  $("h4").css("visibility", "hidden");
  $(".input").css("visibility", "hidden");
  $(".hintsCheckbox").css("visibility", "hidden");
      
}

  //Draw highscores screen //
function highscores_screen(){

  //visibility of buttons
  $("#start").css("visibility", "hidden");
  $("#instructions").css("visibility", "hidden");
  $("#highscores").css("visibility", "hidden");
  $(".dropdown").css("visibility", "hidden");
  $("#homepage").css("visibility", "visible");
  $("#easy").css("visibility", "hidden");
  $("#medium").css("visibility", "hidden");
  $("#hard").css("visibility", "hidden");
  $("#enter").css("visibility", "hidden");
  $(".hintsCheckbox").css("visibility", "hidden");

  $("img").css("visibility", "hidden");

  //visibility of text
  $("h1").css("visibility", "visible");
  $("h1").text("Highscores");

  $("h2").css("visibility", "visible");
  $("h2").css("height", "5%");
  $("h2").css("padding-top", "10px")
  $("h2").css("padding-bottom", "15px")
  $("h2").text("Your stats for each level are below!");


  $("h3").css("visibility", "visible");
  $("#easylabel").text("Easy: "); 
  $("#mediumlabel").text("Medium: ");
  $("#hardlabel").text("Hard: ");
  $("#easyscore").text("Your highest number of guesses correct in a row are " + easy_HighestCorrectRow + ". Therefore, your highscore is " + easy_points +" points!"); //Change the text inside the labels to state score
  $("#mediumscore").text("Your highest number of guesses correct in a row are " + medium_HighestCorrectRow + ". Therefore, your highscore is " + medium_points +" points!");
  $("#hardscore").text("Your highest number of guesses correct in a row are " + hard_HighestCorrectRow + ". Therefore, your highscore is " + hard_points +" points!");
  $("h4").css("visibility", "hidden");
  $(".input").css("visibility", "hidden");
}

//Draw instructions screen
function instructions_screen(){

  //visibility of buttons
  $("#start").css("visibility", "hidden");
  $("#instructions").css("visibility", "hidden");
  $("#highscores").css("visibility", "hidden");
  $(".dropdown").css("visibility", "hidden");
  $("#homepage").css("visibility", "visible");+
  $("#easy").css("visibility", "hidden");
  $("#medium").css("visibility", "hidden");
  $("#hard").css("visibility", "hidden");
  $("#enter").css("visibility", "hidden");
  $(".hintsCheckbox").css("visibility", "hidden");

  $("img").css("visibility", "hidden");

  //visibility of text
  $("h1").css("visibility", "visible");
  $("h1").text("Instructions");
  $("h2").css("visibility", "visible");
  $("h2").css("height", "70%");
  $("h3").css("visibility", "hidden");
  $("h4").css("visibility", "hidden");

  $("h2").css("visibility", "visible");
  $("h2").css("height", "fit-content");


  $("h2").text(" ");
  var insertTxt = "The objective of the game: score the most points by guessing the random number correctly multiple times in a row <br/> Levels (parameters for Random Number) and points: <br/> <li>Easy: 1-10, Points - 5 </li> <li>Medium:  1-50, Points - 25 </li> <li>Hard: 1-100, Points - 50 </li>  <br/> You have unlimited attempts but the game will end when you enter a 0 or click exit. <br/> Additionally, if you click the hints checkbox, the game will give you hints when your guess is wrong."
  $("h2").append(insertTxt);

 
  $("h3").css("visibility", "hidden");
  $("h4").css("visibility", "hidden");
  $(".input").css("visibility", "hidden");


}
   
//Draw levels screen
function levels_screen(){
  //buttons visibility
  $("#start").css("visibility", "hidden");
  $("#instructions").css("visibility", "hidden");
  $("#highscores").css("visibility", "hidden");
  $(".dropdown").css("visibility", "visible");
  $("#homepage").css("visibility", "visible");
  $("#easy").css("visibility", "visible");
  $("#medium").css("visibility", "visible");
  $("#hard").css("visibility", "visible");
  $("#enter").css("visibility", "hidden");
  $(".hintsCheckbox").css("visibility", "hidden");

  $("img").css("visibility", "visible");
 
  //add image
   $("#easyimg").attr("src",'easy.png');
   $("#mediumimg").attr("src",'medium.png');
   $("#hardimg").attr("src",'hard.png');
  

  //labels visibility
  $("h1").css("visibility", "visible");
  $("h1").text("Select Difficulty");

  $("h2").css("visibility", "hidden");
  $("h3").css("visibility", "hidden");
  $("h4").css("visibility", "hidden");
  $(".input").css("visibility", "hidden");

}

//Draw gamepage_screen
function gamepage_screen(){

  //visibility of buttons
  $("#start").css("visibility", "hidden");
  $("#instructions").css("visibility", "hidden");
  $("#highscores").css("visibility", "hidden");
  $(".dropdown").css("visibility", "visible");
 
  $("#exit").css("visibility", "hidden");
  $("#easy").css("visibility", "hidden");
  $("#medium").css("visibility", "hidden");
  $("#hard").css("visibility", "hidden");
  $("#enter").css("visibility", "visible");
  $(".hintsCheckbox").css("visibility", "visible");

  $("img").css("visibility", "hidden");
  
  
  

  //visibility of text
  $("h1").css("visibility", "visible");
  $("h1").text("Guess The X!!!");

  $("h2").css("visibility", "visible");
  $("h2").css("height", "20%");
  $("h2").css("padding-top", "10px")
  $("h2").css("padding-bottom", "15px")
 


  $("h3").css("visibility", "hidden");
  $("h4").css("visibility", "visible");
  $("h4").text(" ");
  $(".input").css("visibility", "visible");
 
}



//Program stores the desired level user wants, sets min and max for input, calls gamepage, and generates random num
function easy_level(){    
  level = "easy"; 
  max = 10;
  min = 1; 

  $("#num").attr({
    "max" : 10,
    "min" : 1
 });

  //fix h2 accordingly
  $("h2").text("Enter a number between 1 and 10 for this level. Remember, points of 5 will be awarded based on your highest streak of guesses per guess!");
  gamepage_screen();
  generateNumber();
}
function medium_level(){ 
  level = "medium"; 
  max = 50;
  min = 1; 
 $("#num").attr({
    "max" : 50,
    "min" : 1
 });
 $("h2").text("Enter a number between 1 and 50 for this level. Remember, points of 25 will be awarded based on your highest streak of guesses per guess!");
  gamepage_screen();
  generateNumber();
}
function hard_level(){ 
  level = "hard"; 
  max = 100;
  min = 1; 
  $("#num").attr({
    "max" : 100,
    "min" : 1
 });
 $("h2").text("Enter a number between 1 and 100 for this level. Remember, points of 50 will be awarded based on your highest streak of guesses per guess!");
  gamepage_screen();
  generateNumber();
}

///////////////////////////////////////////////
//////////////Change background////////////////
///////////////////////////////////////////////
function forestpic(){
  $("body").css("background-image", "url('forest.jfif')");
  $(".input").css("color", "black");
  $(".hintsCheckbox").css("color", "black");
}

function desertpic(){
  $("body").css("background-image", "url('desert.jpg')");
  $(".input").css("color", "black");
  $(".hintsCheckbox").css("color", "black");
}

function galaxypic(){
  $("body").css("background-image", "url('galaxy.jpg')");
  $(".input").css("color", "white");
  $(".hintsCheckbox").css("color", "white");
}

function regularpic(){
  $("body").css("background-image", "url('')");
  $(".input").css("color", "black");
  $(".hintsCheckbox").css("color", "black");
}

