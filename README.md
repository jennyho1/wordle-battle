
# Wordle Battle

Welcome to Wordle Battle! This project is a real-time, multiplayer version of the popular word-guessing game Wordle. 
Built with React for the frontend, Node.js for the backend, and [WebSockets](https://www.npmjs.com/package/ws) for player synchronization, this game allows multiple players to enjoy the fun of Wordle together.

## Features

- Real-time multiplayer gameplay
- Player synchronization using WebSocket
- Interactive and user-friendly interface
- Real-time updates of player guesses
- Score tracking
- a single multiplayer game running
- game ends every 5 minutes
- realtime, sockets based display of game status, clock, number of players, num won, num lost (as in mordle.io)
- display of user and global statistics (on stats page), keep it simple: wins, lost, played for both the user
  and for the group.

## Demo

Check out the live demo of the game [here](#).

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**

   ```sh
   git clone https://github.com/jennyho1/multiplayer-wordle-game.git
   cd multiplayer-wordle-game
	 ```

2. **Install dependencies**
	For the backend
	```sh
	cd backend
	npm install
	```
	For the frontend
	```sh
	cd frontend
	npm install
	```

