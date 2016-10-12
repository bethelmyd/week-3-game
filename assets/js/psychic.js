"use strict";
var guesses = ""; //global variable
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var letters = "abcdefghijklmnopqrstuvwxyz";
// var letters = "ab";
var computerGuess = "";
var userGuess = "";
var gameOn = false;

document.onkeydown = function(event)
{
	if (!gameOn){
		gameOn = true;
		reset();
		getComputerGuess();
		document.querySelector("#results").innerHTML = "";
	}
	else{
		getUserGuess(event);
		if(userGuess == "") return;  //guessed already
		if(userGuess == computerGuess)
		{
			wins++;
			gameOn = false;
			showSummary();
		}
		else
		{
			guessesLeft--;
			document.querySelector("#guessesLeft").innerHTML = guessesLeft;	
			if(guessesLeft == 0)
			{
				losses++;
				gameOn = false;
				showSummary();
			}

		}
	}
}


function getUserGuess(event)
{
	userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	if(userGuess < 'a' || userGuess > 'z' || guesses.indexOf(userGuess) >= 0){
		userGuess = "";
		return;
	}
	guesses += userGuess + " ";
	document.querySelector("#guesses").innerHTML = guesses;
}

function getComputerGuess()
{
	var computerRandomNumber = Math.floor(Math.random() * letters.length);
	computerGuess = letters.charAt(computerRandomNumber);
	// document.querySelector("#computerGuess").innerHTML = computerGuess;		
}

function showSummary()
{
	if(guessesLeft > 0)
	{
		document.querySelector("#results").innerHTML = "<p>Congrats! You won!</p><p>Press any key to play again.</p>";	
	}
	else
	{
		document.querySelector("#results").innerHTML = "<p>Sorry! You lost!</p><p>Press any key to play again.</p>";	
	}
	document.querySelector("#computerGuess").innerHTML = computerGuess;	
	document.querySelector("#wins").innerHTML = wins;	
	document.querySelector("#losses").innerHTML = losses;	
}

function reset()
{
	guesses = "";
	// wins = 0;
	// losses = 0;
	guessesLeft = 10;
	computerGuess = "";
	document.querySelector("#guesses").innerHTML = guesses;	
	// document.querySelector("#wins").innerHTML = wins;	
	// document.querySelector("#losses").innerHTML = losses;	
	document.querySelector("#guessesLeft").innerHTML = guessesLeft;	
	document.querySelector("#computerGuess").innerHTML = computerGuess;	
	document.querySelector("#results").innerHTML = "Press any key to start.";
}