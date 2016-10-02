"use strict";
var guesses = ""; //global variable
var wins = 0;
var losses = 0;
var guessesLeft = 6;
var letters = "abcdefghijklmnopqrstuvwxyz";
//var letters = "ab";
var computerGuess = "";
var gameOver = false;
var numBodyParts = 6;

document.onkeydown = function(event)
{
	if(gameOver)
	{
		reset();		
	}
	else
	{
		var userGuess = getUserGuess(event);
		computerGuess = getComputerGuess();
		seeWhoWonRound(userGuess, computerGuess);
		if(gameOver)
		{
			seeWhoWon();
		}
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
		showPartOfMan(losses);
		losses++;
	}

	gameOver = (losses == numBodyParts);

	document.querySelector("#wins").innerHTML = wins;	
	document.querySelector("#losses").innerHTML = losses;	
	document.querySelector("#guessesLeft").innerHTML = guessesLeft;	
}

function seeWhoWon()
{
	if(wins > losses)
	{
		document.querySelector("#results").innerHTML = "<p>Congrats! You won!</p><p>Press any key to play again.</p>";	
	}
	else if (losses > wins)
	{
		document.querySelector("#results").innerHTML = "<p>Sorry! You lost!</p><p>Press any key to play again.</p>";	
	}
	else
	{
		document.querySelector("#results").innerHTML = "<p>Looks like we tied.</p><p>Press any key to play again.</p>";	
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
	document.querySelector("#results").innerHTML = "";
	hideMan();
	gameOver = false;
}

var man = ["head", "body", "leftArm", "rightArm", "leftLeg", "rightLeg"];
function showPartOfMan(part)
{
	if(part == 1)  //show the torso
	{
		var torso = document.querySelectorAll("." + man[1]);
		torso[0].style.visibility = "visible";
		torso[1].style.visibility = "visible";
	}
	else
	{
		var otherPart = document.querySelector("#" + man[part]);
		otherPart.style.visibility = "visible";		
	}
}

function hideMan()
{
	for(var i = 0; i < man.length; i++)
	{
		var part = man[i];
		if(i == 1)
		{
			var torso = document.querySelectorAll("." + man[1]);
			torso[0].style.visibility = "hidden";
			torso[1].style.visibility = "hidden";			
		}
		else
		{
			var otherPart = document.querySelector("#" + man[i]);
			otherPart.style.visibility = "hidden";		
		}
	}
}