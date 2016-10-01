"use strict";
var guesses = ""; //global variable
var wins = 0;
var losses = 0;
var guessesLeft = 10;
var letters = "abcdefghijklmnopqrstuvwxyz";

document.onkeydown = function(event)
{
	getUserGuess(event);
	var computerGuess = getComputerGuess();
}

function getUserGuess(event)
{
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	guesses += userGuess + " ";
	document.querySelector("#guesses").innerHTML = guesses;	
}

function getComputerGuess()
{
	var computerRandomNumber = Math.floor(Math.random() * letters.length);
	var computerGuess = letters.charAt(computerRandomNumber);
	document.querySelector("#computerGuess").innerHTML = computerGuess;			
}