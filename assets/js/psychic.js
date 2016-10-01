"use strict";
var guesses = ""; //global variable
var wins = 0;
var losses = 0;
var guessesLeft = 10;
//var letters = "abcdefghijklmnopqrstuvwxyz";
var letters = "ab";
var computerGuess = "";

document.onkeydown = function(event)
{
	document.querySelector("#results").innerHTML = "";
	var userGuess = getUserGuess(event);
	computerGuess = getComputerGuess();
	seeWhoWonRound(userGuess, computerGuess);
	if(guessesLeft == 0)
	{
		seeWhoWon();
		reset();
	}
}

function getUserGuess(event)
{
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	guesses += userGuess + " ";
	document.querySelector("#guesses").innerHTML = guesses;
	return userGuess;
}

function getComputerGuess()
{
	var computerRandomNumber = Math.floor(Math.random() * letters.length);
	var computerGuess = letters.charAt(computerRandomNumber);
	document.querySelector("#computerGuess").innerHTML = computerGuess;	
	return computerGuess;		
}

function seeWhoWonRound(userGuess, computerGuess)
{
	if(userGuess == computerGuess)
	{
		wins++;
	}
	else
	{
		losses++;
	}

	guessesLeft--;

	document.querySelector("#wins").innerHTML = wins;	
	document.querySelector("#losses").innerHTML = losses;	
	document.querySelector("#guessesLeft").innerHTML = guessesLeft;	
}

function seeWhoWon()
{
	if(wins > losses)
	{
		document.querySelector("#results").innerHTML = "Congrats! You won!";	
	}
	else if (losses > wins)
	{
		document.querySelector("#results").innerHTML = "Sorry! You lost!";	
	}
	else
	{
		document.querySelector("#results").innerHTML = "Looks like we tied.";	
	}
}

function reset()
{
	guesses = "";
	wins = 0;
	losses = 0;
	guessesLeft = 10;
	computerGuess = "";
	document.querySelector("#guesses").innerHTML = guesses;	
	document.querySelector("#wins").innerHTML = wins;	
	document.querySelector("#losses").innerHTML = losses;	
	document.querySelector("#guessesLeft").innerHTML = guessesLeft;	
	document.querySelector("#computerGuess").innerHTML = computerGuess;	
}