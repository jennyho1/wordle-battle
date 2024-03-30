/**
 * read    GET - Safe, Idempotent, Cachable
 * update  PUT - Idempotent
 * delete  DELETE - Idempotent
 * create  POST
 *
 * https://restfulapi.net/http-methods/
 * https://restfulapi.net/http-status-codes/
 *
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
 * https://restfulapi.net/rest-put-vs-post/
 **/

const port = 8550; 
const webSocketPort = 8550+2;
const express = require('express');
const { WebSocketServer, WebSocket } = require('ws');

const cookieParser = require('cookie-parser');

const app = express();
const fs = require('fs');
const Wordle = require("./model.js");

const database = {};
var words = ["words"]; // just in case!!

const gameState = {
	wordle: null,
	target: "",
	endTime: null,
	timeout: null,
	won: 0,
	lost: 0,
	stillPlaying: 0,
	players: []
};

const duration = 1000*60*5;  // 5 minutes

/******************************************************************************
 * word routines
 ******************************************************************************/

// Read in all words, lets hope this finished before we need the words!
// https://www.memberstack.com/blog/reading-files-in-node-js
fs.readFile('./words.5', 'utf8', (err, data) => {
	if (err)console.error(err);
	else words = data.split("\n");
});

/******************************************************************************
 * middleware
 ******************************************************************************/
app.use(cookieParser());
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

// https://expressjs.com/en/starter/static-files.html
// app.use(express.static('static-content')); 

// web sockets
const wss = new WebSocketServer({ port: webSocketPort });

/******************************************************************************
 * routes
 ******************************************************************************/
app.get('/api/username/', function (req, res) {
  let username = '';

	if (req.cookies.username){
		username = req.cookies.username;
	} else {
		let wordle=new Wordle(words);
		username=wordle.getUsername();
		let time = 120*60*1000;
		res.cookie('username', username, { maxAge: time });
	}
	res.status(200);
	res.json({"username":username});
});

app.put('/api/username/:username/newgame', function (req, res) {
	let username=req.params.username;

	if(!(username in database)){
		let wordle=new Wordle(words);
		wordle.setUsername(username);
		database[username]=wordle;
	} 
	database[username].reset();

	// --- multiplayer logic ---
	database[username].setTarget(gameState.target);
	gameState.stillPlaying++;
	// broadcastGameState();
	// -------------------------

	res.status(200);
	res.json({"status":"created", "gameState": getGameState()});
});

// Add another guess against the current secret word
app.post('/api/username/:username/guess/:guess', function (req, res) {
	let username=req.params.username;
	let guess=req.params.guess;

	if(! username in database){
		res.status(409);
		res.json({"error":`${username} does not have an active game`});
		return;
	}
	var data = database[username].makeGuess(guess);

	// --- multiplayer logic ---
	if (data.state == "won") {
		gameState.won++;
		gameState.stillPlaying--;
	} else if (data.state == "won"){
		gameState.lost++;
		gameState.stillPlaying--;
	}
	broadcastGameState();
	// -------------------------

	res.status(200);
	res.json(data);
});

app.listen(port, function () {
  	console.log('Wordle app listening on port '+port);
});


/******************************************************************************
 * Web Socket Server
 ******************************************************************************/

function getGameState(){
	let message = JSON.stringify({
		won: gameState.won,
		lost: gameState.lost,
		stillPlaying: gameState.stillPlaying,
		endTime: gameState.endTime,
		players: gameState.players
	});
	return message;
}

function broadcastGameState(){
	let message = getGameState();
	wss.clients.forEach(function each(client) {	
		if (client.readyState === WebSocket.OPEN) {
			client.send(message);
		}
	});
}


wss.on('connection', function(connection) {

	console.log(`A player has connected.`);

	// a single game is created once the first client connection is established
	// and restarts every 5 minutes
	if (gameState.wordle == null){
		gameState.wordle = new Wordle(words);
		startNewGame();
	}

	connection.on('message', function(data) {
		const username = data.toString();
		console.log("Player joined: ", username);
		connection.username = username;
		gameState.players.push(username);
		broadcastGameState();
		// TODO: handle case where the user joins a game that it already joined
	});

	connection.on('close', function() {
		console.log('A player has disconnected.');
		// TODO: update game state if the player was playing
	});

});

wss.on('close', function(code, data) {
  console.log('web socket server disconnected: ' + data.toString());
});


/******************************************************************************
 * wordle game routines
 ******************************************************************************/

function startNewGame() {
	gameState.target = gameState.wordle.getRandomWord();
	gameState.timeout = setTimeout(startNewGame, duration);
	gameState.endTime = Date.now() + duration;
	gameState.won = 0;
	gameState.lost = 0;
	gameState.stillPlaying = 0;
	gameState.players = [];
	console.log("New word: ", gameState.target);
}
