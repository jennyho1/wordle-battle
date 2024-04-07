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
const webSocketPort = port+2;
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
	players: [],
	inprogress: false,
	timesup: false
};

const duration = 1000*60*5;  // 5 minutes
const clients = {}; // maps usernames to client connections

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
	if (!gameState.inprogress) {
		startNewGame();
	}
	if (!gameState.players.includes(username)) {
		gameState.players.push(username);
	}
	database[username].setTarget(gameState.target);
	gameState.stillPlaying++;
	updateGameState();
	// -------------------------

	res.status(200);
	res.json({"status":"created", "gameState": getGameState(false)});
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
	} else if (data.state == "lost"){
		gameState.lost++;
		gameState.stillPlaying--;
	}
	updateGameState();
	data.gameState = JSON.parse(getGameState(false));
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

function getGameState(includeTarget){
	let message = {
		won: gameState.won,
		lost: gameState.lost,
		stillPlaying: gameState.stillPlaying,
		endTime: gameState.endTime,
		players: gameState.players,
		inprogress: gameState.inprogress,
		timeRemaining: getTimeRemaining(),
		timesup: gameState.timesup,
		target: '',
	};
	if (includeTarget){
		message.target = gameState.target;
	}
	return JSON.stringify(message);
}

function updateGameState() {
	if (gameState.stillPlaying == 0){
		gameState.inprogress = false;
	}
	broadcastGameStateToPlayers(false);
}

function broadcastGameStateToPlayers(includeTarget){
	let message = getGameState(includeTarget);
	gameState.players.forEach(function each(player) {	
		let connection = clients[player];
		if (connection != null && connection.readyState === WebSocket.OPEN) {
			connection.send(message);
		}
	});
}

console.log(wss == null)
console.log(wss)

wss.on('connection', function(connection) {

	// a single game is created once the first client connection is established
	if (gameState.wordle == null){
		gameState.wordle = new Wordle(words);
	}

	// on client connection, client will send to server their username
	connection.on('message', function(data) {
		const username = data.toString();
		connection.username = username;
		clients[username] = connection;
		console.log(`${connection.username} has connected.`); // --debug
	});

	connection.on('close', function() {
		// update game state if the player was still playing
		if (connection.username != null && database[connection.username].getState() == 'play'){
			console.log(`${connection.username} player disconnected`) // --debug
			gameState.stillPlaying--;
			const index = gameState.players.indexOf(connection.username);
			gameState.players.splice(index, 1);
			updateGameState();
		}
	});

});

wss.on('close', function(code, data) {
  console.log('web socket server disconnected: ' + data.toString());
});


/******************************************************************************
 * wordle game routines
 ******************************************************************************/

function startNewGame() {
	clearTimeout(gameState.timeout);
	gameState.target = gameState.wordle.getRandomWord();
	gameState.endTime = Date.now() + duration;
	gameState.won = 0;
	gameState.lost = 0;
	gameState.stillPlaying = 0;
	gameState.players = [];
	gameState.inprogress = true;
	gameState.timesup = false;
	gameState.timeout = setTimeout(gameOver, duration);
	// console.log("New word: ", gameState.target);
}

function gameOver() {
	gameState.inprogress = false;
	gameState.timesup = true;
	broadcastGameStateToPlayers(true);
}

function getTimeRemaining() {
	let timeRemaining = gameState.endTime - Date.now();
	return timeRemaining;
}