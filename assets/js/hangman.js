"use strict";
var guesses = ""; //global variable
var wins = 0;
var losses = 0;
var guessesLeft = 0;
var words = ["doberman", "schnauzer", "rottweiler", "pekingese", "pug", "cocker spaniel", "pit bull", "maltese"];
var word;
var computerGuess = "";
var gameOver = false;
var numBodyParts = 6;
var gameOn = false;

document.querySelector("#startBtn").onclick = function(event)
{
	if(!gameOn)
	{
		reset();		
		gameOn = true;
		generateWord();
		setUpWordEnvironment();
	}
}

document.querySelector("#resetBtn").onclick = function(event)
{
	reset();
}

document.onkeydown = function(event)
{
	if(gameOn)
	{
		var userGuess = getUserGuess(event);
		if(userGuess >= 'a' && userGuess <= 'z')
		{
			processRound(userGuess);
			if(!gameOn)
			{
				seeWhoWon();
			}
		}
	}
}

function getUserGuess(event)
{
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	if(userGuess >= 'a' && userGuess <= 'z')
	{
		guesses += userGuess + " ";
		document.querySelector("#guesses").innerHTML = guesses;
	}
	return userGuess;
}

function generateWord()
{
	var computerRandomNumber = Math.floor(Math.random() * words.length);
	word = words[computerRandomNumber];
	guessesLeft = word.length - countSpaces(word);
	console.log(guessesLeft);
}

function setUpWordEnvironment()
{
	// create the span tags for placing the word
	var html = "";
	for(var i = 0; i < word.length; i++)
	{
		html += '<span class="' + word.charAt(i) + '">' + ((word.charAt(i)==' ')?' ':"*") + "</span>";
	}

	document.querySelector("#wordGoesHere").innerHTML += html;	
}

function processRound(userGuess)
{
	if(word.indexOf(userGuess) >= 0)  //letter was found in word
	{
		//replace letter in word by '*'
		word = word.replace(userGuess, '*');
		//replace the '*' in the corresponding output area with the letters
		var spans = document.querySelectorAll("."+userGuess);
		for(var i = 0; i < spans.length; i++)
		{
			spans[i].innerHTML = userGuess;
		}
		guessesLeft -= i;
		console.log(guessesLeft);
	}
	else
	{
		showPartOfMan(losses);
		losses++;
	}

	gameOn = !(losses == numBodyParts || guessesLeft == 0);

}

function seeWhoWon()
{
	if(guessesLeft == 0)
	{
		document.querySelector("#results").innerHTML = "<p>Whew!</p>";	
	}
	else
	{
		document.querySelector("#results").innerHTML = "<p>Argggggggggg!</p>";	
	}
}

function reset()
{
	guesses = "";
	wins = 0;
	losses = 0;
	computerGuess = "";
	document.querySelector("#guesses").innerHTML = guesses;	
	document.querySelector("#results").innerHTML = "";
	document.querySelector("#wordGoesHere").innerHTML = "Current word: ";
	hideMan();
	gameOver = false;
	gameOn = false;
}

var man = ["head", "body", "leftArm", "rightArm", "leftLeg", "rightLeg"];
function showPartOfMan(part)
{
	if(part < 0 || part >= man.length) return;
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

function countSpaces(str)
{
	var count = 0;
	for(var i = 0; i < str.length; i++)
	{
		if(str.charAt(i) == ' ')
			count++;
	}
	return count;
}
