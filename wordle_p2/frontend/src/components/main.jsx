import React from 'react';
import { toast } from 'react-toastify';
import { api_getUsername, api_guess, api_newgame }  from './api'; 

// import all Components
import { Home } from './ui_top/home'
import { Instructions } from './ui_top/instructions'
import { Stats } from './ui_top/stats'
import { Play } from './ui_top/play'
import { Username } from './ui_top/username'
import { Header } from './ui_top/header'
import { Modal } from './ui_utils/modal'


const getInitialGameState = () => { 
	return {
		enable: false,
		row: 0,
		col: 0,
		letterbox: [
			['', '', '', '', ''],
			['', '', '', '', ''],
			['', '', '', '', ''],
			['', '', '', '', ''],
			['', '', '', '', ''],
			['', '', '', '', '']],
		alphabetMap : {"Q":0,"W":0,"E":0,"R":0,"T":0,"Y":0,"U":0,"I":0,"O":0,"P":0,"A":0,"S":0,"D":0,"F":0,"G":0,"H":0,"J":0,"K":0,"L":0,"Z":0,"X":0,"C":0,"V":0,"B":0,"N":0,"M":0,},
		boardColors: [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]],
	}
}

const socket = new WebSocket(`ws://${window.location.hostname}:8552`);

class Main extends React.Component {
  constructor(props) {
		super(props);
		this.state = { 
			pagename: "ui_username",
			username: "",
			guiState: getInitialGameState(),
			wins: 0,
			losses: 0,
			gameState: {won:0, lost:0, stillPlaying:0, timeRemaining:0}
		};
		this.playRef = React.createRef();
		this.modalRef = React.createRef();
  }

	componentDidMount() {
		// get username once on load
		api_getUsername((data) => {
			let username = data.username;
			this.setState({username: username});
		});

		// on web socket connection, send username to server
		socket.addEventListener("open", event => {
			console.log('WebSocket connection established');
			
		});
		// on receiving message from server, update gameState
		socket.addEventListener("message", event => {
			let data = JSON.parse(event.data);
			// console.log("Message from server ", data)
			console.log("Players: ", data.players)
			this.setState({gameState: data});
		});
	
	}


	handleSwitchPage = (name) => {
		this.setState({pagename: name});
	}

	createNewGame = () => {
		api_newgame(this.state.username, (data) => {
			let gameState = JSON.parse(data.gameState);
			this.setState({guiState: {...getInitialGameState(), enable: true}, gameState: gameState})
			if (socket && socket.readyState === WebSocket.OPEN){
				socket.send(this.state.username);
			}
		})
	}

	handleKeyPress = (c) => {
		const { row, col, letterbox} = this.state.guiState;
		if (c === 'DEL'){
			if (col > 0){
				const updatedLetterbox = [...letterbox];
				updatedLetterbox[row][col-1] = '';
				this.setState({ guiState: {...this.state.guiState, letterbox: updatedLetterbox, col: col-1 }});
			}
		} else if (c === 'ENTER') {
			if (col > 0){
				let guess = letterbox[row].join('');
				api_guess(this.state.username, guess, this.handleMakeGuess)
			}
		} else {
			if (col < 5){
				const updatedLetterbox = [...letterbox];
				updatedLetterbox[row][col] = c;
				this.setState({ guiState: {...this.state.guiState, letterbox: updatedLetterbox, col: col+1 }});
			}
		}
  };

	handleMakeGuess = (data) => {
		if (data.success){
			this.updateBoard(data.score);
			if (data.state === 'won' || data.state === 'lost') {
				this.modalRef.current.showModal(data.state, data.target);
				let wins = data.state === 'won' ? this.state.wins + 1 : this.state.wins;
				let losses = data.state === 'lost' ? this.state.losses + 1 : this.state.losses;
				this.setState({guiState: {...this.state.guiState, enable: false}, wins: wins, losses: losses});
			}
		} else {
			toast.error(data.error, {
				autoClose: 5000,
				theme: "colored",
			});
		}
	}

	updateBoard = (score) => {
		const updatedAlphabetMap = {...this.state.guiState.alphabetMap};
		const updatedBoardColors = [...this.state.guiState.boardColors];
		const { row } = this.state.guiState;

		for (let i=0; i<score.length; i++){
			var s = score[i].score;
			var c = score[i].char;
	
			// updating game board
			updatedBoardColors[row][i] = s;
	
			// updating keyboard if new score is better than current score
			if (s > updatedAlphabetMap[c]){
				updatedAlphabetMap[c] = s;
			}
		}
		let newGuiState = {...this.state.guiState, alphabetMap: updatedAlphabetMap, boardColors: updatedBoardColors, row: row+1, col: 0 };
		this.setState({ guiState: newGuiState});
	}

	renderUIComponent() {
		if (this.state.pagename === "ui_home") {
			return <Home switchPage={this.handleSwitchPage}/>;
		} else if (this.state.pagename === "ui_username") {
			return <Username user={this.state.username}/>;
		} else if (this.state.pagename === "ui_play") {
			return (
				<Play 
					guiState={this.state.guiState} 
					gameState={this.state.gameState}
					onKeyPress={this.handleKeyPress} 
					createNewGame={this.createNewGame} 
					ref={this.playRef}
				/>
			);
		} else if (this.state.pagename === "ui_stats") {
			return <Stats wins={this.state.wins} players={1} losses={this.state.losses}/>;
		} else if (this.state.pagename === "ui_instructions") {
			return <Instructions />;
		} 
 }

  render() {
    return (
			<div>
				<Header switchPage={this.handleSwitchPage} pagename={this.state.pagename}/>
				{ this.renderUIComponent()}
				<Modal ref={this.modalRef}/>
			</div>
    );
  }
}
export { Main };
