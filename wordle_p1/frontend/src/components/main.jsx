/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { api_getUsername, api_guess, api_newgame }  from './api'; 

class Header extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			pagename : "ui_username"
		};
  }

	handleClick = (e) => {
		this.props.switch(e.currentTarget.id)
		this.setState({pagename: e.currentTarget.id});
	}
	
  render() {
    return (
		<header>
			<nav className={this.state.pagename}>
				<span className="alignleft"></span>
				<span className="aligncenter">
					<a id={"ui_home"} onClick={this.handleClick}><span className="ui_home" style={{'fontSize':'x-large', 'textDecoration':'underline'}}>309DLE</span></a>
				</span>
				<span className="alignright">
					<a id={"ui_username"} onClick={this.handleClick} ><span className="ui_username material-symbols-outlined"> person </span></a>
					<a id={"ui_play"} onClick={this.handleClick}><span className="ui_play material-symbols-outlined"> play_circle </span></a>
					<a id={"ui_stats"} onClick={this.handleClick}><span className="ui_stats material-symbols-outlined"> leaderboard </span></a>
					<a id={"ui_instructions"} onClick={this.handleClick}><span className="ui_instructions material-symbols-outlined"> help </span></a>
				</span>
			</nav>
		</header>
    );
  }
}

function Home() {
  return (
		<div className="ui_top" id="ui_home">
			<div className="textblock"> 
				Solo
				<br/>
				Play the classic game against yourself. 
			</div>
		</div>
  );
}

function Username({ user }) {
  return (
		<div className="ui_top" id="ui_username">
			<h2>username: <span id="username">{user}</span></h2>
		</div>
  );
}


function Key({ val, onKeyPress }) {
  return (<td onClick={() => onKeyPress(val)}>{val}</td>);
}

class Play extends React.Component {

	handleKeyPress = (c) => {
		if (this.props.guiState.enable){
			this.props.onKeyPress(c);
		}
	}

  render() {
    return (
		<div className="ui_top" id="ui_play">
			<center>
				<table className="letterbox">
					<tbody>
						{this.props.guiState.letterbox.map((row, rowIndex) => (
							<tr className={'row'+rowIndex} key={rowIndex}>
								{row.map((cell, colIndex) => (<td className={'col'+colIndex} key={colIndex}>{cell}</td>))}
							</tr>
						))}
					</tbody>
				</table>
			</center>
			<br/>
			<br/>
			<center>
				<table className="keyboardrow">
					<tbody>
						<tr>
							{['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((c, index) => (
								<Key val={c} onKeyPress={this.handleKeyPress} key={index}/>
							))}
						</tr>
					</tbody>
				</table>
				<table className="keyboardrow">
					<tbody>
						<tr>
							{['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((c, index) => (
								<Key val={c} onKeyPress={this.handleKeyPress} key={index}/>
							))}
						</tr>
					</tbody>
				</table>
				<table className="keyboardrow">
					<tbody>
						<tr>
							{['DEL', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'].map((c, index) => (
								<Key val={c} onKeyPress={this.handleKeyPress} key={index}/>
							))}
						</tr>
					</tbody>
				</table>
			</center>
			<br/>
			<br/>
			<center>
				{!this.props.guiState.enable ? <button id="play_newgame_button" style={{'background':'red'}} onClick={this.props.createNewGame}>NEW GAME</button>: null }
			</center>
		</div>
    );
  }
}


function Stats() {
  return (
		<div className="ui_top" id="ui_stats">
			<center style={{'fontSize':'xx-large'}}>
				<span className="material-symbols-outlined"> check_circle </span> 8 &nbsp;
				<span className="material-symbols-outlined"> help </span> 1 &nbsp;
				<span className="material-symbols-outlined"> cancel </span> 2
			</center>
		</div>
  );
}


function Instruction() {
  return (
		<div className="ui_top" id="ui_instructions">
			<div className="textblock"> 
				Take a look a mordle.io instructions.
			</div>
		</div>
  );
}


class Main extends React.Component {
  constructor(props) {
    	super(props);
    	this.state = { 
				pagename: "ui_username",
				username: "",
				guiState: {
					row: 0,
					col: 0,
					letterbox: [
						['', '', '', '', ''],
						['', '', '', '', ''],
						['', '', '', '', ''],
						['', '', '', '', ''],
						['', '', '', '', ''],
						['', '', '', '', ''],
					],
					enable: false
				}
			}
  }

	componentDidMount() {
		api_getUsername(this.handleUsername);
	}

	handleUsername = (data) => {
		this.setState({username: data.username});
	}

	handleSwitch = (name) => {
		this.setState({pagename: name});
	}

	createNewGame = () => {
		api_newgame(this.state.username, this.enableGame)
	}

	enableGame = () => {
		this.setState({guiState: {...this.state.guiState, enable: true}})
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
			if (col === 5){
				this.setState({ guiState: {...this.state.guiState, row: row+1, col: 0 }});
			}
		} else {
			if (col < 5){
				const updatedLetterbox = [...letterbox];
				updatedLetterbox[row][col] = c;
				this.setState({ guiState: {...this.state.guiState, letterbox: updatedLetterbox, col: col+1 }});
			}
		}
  };

	renderUIComponent() {
		if (this.state.pagename === "ui_home") {
			return <Home />;
		} else if (this.state.pagename === "ui_username") {
			return <Username user={this.state.username}/>;
		} else if (this.state.pagename === "ui_play") {
			return <Play guiState={this.state.guiState} onKeyPress={this.handleKeyPress} createNewGame={this.createNewGame}/>;
		} else if (this.state.pagename === "ui_stats") {
			return <Stats />;
		} else if (this.state.pagename === "ui_instructions") {
			return <Instruction />;
		} 
 }

  render() {
    return (
			<div>
				<Header switch={this.handleSwitch}/>
				{ this.renderUIComponent()}
			</div>
    );
  }
}
export { Main };
