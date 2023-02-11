//variables used in generateRandNum
var guessedNum;
var randomLimit;

//variables to send back to client side in evaluate
var inputNum;
var num_Attempts=0;
var num_Correct=0;
var num_CorrectRow=0;
var num_HighestCorrectRow=0;
var points;
var randomNum;
var correct;


var levelPoints;
var hint = false;



var express = require('express');
const { resourceLimits } = require('worker_threads');
var app = express();



app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client");
    console.log("Received: ");
    console.log(JSON.parse(req.query['data']));
    var data = JSON.parse(req.query['data']);

    // check if the request action is generateNum
    if (data['action']== 'generateRandNum') {
        //generate a random num for this user
        
        var nameID = data['name'];

        //determines the limit for the random number to be generates and the the points depending on the level
        if((data['level']== 'easy'))
        {
            randomLimit = 10;
            levelPoints = 5;
        }
        else if((data['level']== 'medium'))
        {
            randomLimit = 50;
            levelPoints = 25;
        }
        else if((data['level']== 'hard'))
        {
            randomLimit = 100;
            levelPoints = 50;
        }

        //generate random number
        randomNum = genRandomNum();

        var jsontext = JSON.stringify({
            'action': 'generateRandNum',
            'nameID': nameID,
            'msg': 'New random number generated!!!'
        });
        console.log(jsontext);
        console.log(randomNum);

        // send the response while including the JSON text		
        res.send(jsontext);

    } else if (data['action'] == "evaluate") {
        //evaluate the guessedNum for this user
        
        //store the inputted Num
        inputNum = data['inputNum'];

    
        


        if(randomNum == inputNum) //Checks if input number is true
        {
            correct = true;
        }else 
        {
            correct = false; //otherwise means its false
            if(data['showHints'] == true) //determine if user wants hints and determine output if they do
            {
                if(inputNum>randomNum)
                {
                    hint = "Your guess was wrong. The answer is less than the inputted number. Keep trying!!!";
                }else 
                {
                    hint = "Your guess was wrong. The answer is greater than the inputted number. Keep trying!!!";
                }
            }
        }

       
        results();
        

        var jsontext = JSON.stringify({
            'action':'evaluate', /* ... type of action */
            'correct' : correct, /* ... won or not */
            'inputNum': inputNum,/* ... the answer code when the game ends*/
            'randomNum': randomNum,/* ... the answer*/
            'num_Attempts': num_Attempts,/* ... number of attempts the user has for the game*/
            'num_Correct':num_Correct,/* ... number of guesses correct in total*/
            'num_HighestCorrectRow':num_HighestCorrectRow,/* ... highest streak of guesses correct*/
            'points': points ,/* ... points of the user based on num highestcorrectrow*/
            'hint' : hint/* ... the output message if user wants hints or not*/
        });
        console.log(jsontext);
        res.send(jsontext);

    } else if (data['action'] == "exit") {
        //evaluate the guessedNum for this user
        
      
      
         num_Attempts=0;
         num_Correct=0;
         num_CorrectRow=0;
         num_HighestCorrectRow=0;
         points = 0;
        
        
        
        var jsontext = JSON.stringify({
            'action':'exit', /* ... type of action */
            'correct' : correct /* ... correct or not */
          
        });
        console.log(jsontext);
        res.send(jsontext);

    } else {
        res.send(JSON.stringify({ 'msg': 'error!!!' }));
    }
}).listen(2000);
console.log("Server is running!");


//checks if input number is correct or not and output hint for it
function answer(){

   
}

 //store the results and stats of the user
function results(){

    num_Attempts = num_Attempts+1;

    if (correct ==true)
    {
        num_CorrectRow++;
        
        num_Correct++;

        if (num_CorrectRow >= num_HighestCorrectRow) //check if there is new high of numbers correct in a row
        {
            num_HighestCorrectRow = num_CorrectRow;
        }
        
    }
    else 
    {
        if (num_CorrectRow >= num_HighestCorrectRow) //check if there is new high of numbers correct in a row
        {
            num_HighestCorrectRow = num_CorrectRow;
        }

        num_CorrectRow = 0; // reset the number of guesses correct in a row after checking if there a new high
    }

    points = num_HighestCorrectRow*levelPoints; //calculate the points
}







function genRandomNum(){
    
    randomNum = Math.floor((Math.random() * randomLimit) + 1);

    return randomNum;
   
}