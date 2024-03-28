import React from 'react';
import { api_getUsername, api_guess, api_newgame }  from './api'; 

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
		<header>
			<nav>
				<span className="alignleft"></span>
				<span className="aligncenter">
					<a className="ui_home" style={{'fontSize':'x-large', 'textDecoration':'underline'}}>309DLE</a>
				</span>
				<span className="alignright">
					<a className="ui_username"><span className="material-symbols-outlined"> person </span></a>
					<a className="ui_play"><span className="material-symbols-outlined"> play_circle </span></a>
					<a className="ui_stats"><span className="material-symbols-outlined"> leaderboard </span></a>
					<a className="ui_instructions"><span className="material-symbols-outlined"> help </span></a>
				</span>
			</nav>
		</header>
    );
  }
}

class Main extends React.Component {
  constructor(props) {
    	super(props);
    	this.state = { }
  }
  render() {
    return (
	<div>
		<Header />
		<div className="ui_top" id="ui_home">
			<div className="textblock"> 
				Solo
				<br/>
				Play the classic game against yourself. 
			</div>
		</div>
		<div className="ui_top" id="ui_username">
			<h2>username: <span id="username"></span></h2>
		</div>
		<div className="ui_top" id="ui_play">
			<center>
				<table className="letterbox">
					<tr className="row0" ><td className="col0">&nbsp;</td><td className="col1">&nbsp;</td><td className="col2">&nbsp;</td><td className="col3">&nbsp;</td><td className="col4">&nbsp;</td></tr>
					<tr className="row1" ><td className="col0">&nbsp;</td><td className="col1">&nbsp;</td><td className="col2">&nbsp;</td><td className="col3">&nbsp;</td><td className="col4">&nbsp;</td></tr>
					<tr className="row2" ><td className="col0">&nbsp;</td><td className="col1">&nbsp;</td><td className="col2">&nbsp;</td><td className="col3">&nbsp;</td><td className="col4">&nbsp;</td></tr>
					<tr className="row3" ><td className="col0">&nbsp;</td><td className="col1">&nbsp;</td><td className="col2">&nbsp;</td><td className="col3">&nbsp;</td><td className="col4">&nbsp;</td></tr>
					<tr className="row4" ><td className="col0">&nbsp;</td><td className="col1">&nbsp;</td><td className="col2">&nbsp;</td><td className="col3">&nbsp;</td><td className="col4">&nbsp;</td></tr>
					<tr className="row5" ><td className="col0">&nbsp;</td><td className="col1">&nbsp;</td><td className="col2">&nbsp;</td><td className="col3">&nbsp;</td><td className="col4">&nbsp;</td></tr>
				</table>
			</center>
			<br/>
			<br/>
			<center>
				<table className="keyboardrow">
					<tr><td>Q</td><td>W</td><td>E</td><td>R</td><td>T</td><td>Y</td><td>U</td><td>I</td><td>O</td><td>P</td></tr>
				</table>
				<table className="keyboardrow">
					<tr><td>A</td><td>S</td><td>D</td><td>F</td><td>G</td><td>H</td><td>J</td><td>K</td><td>L</td></tr>
				</table>
				<table className="keyboardrow">
					<tr><td>DEL</td><td>Z</td><td>X</td><td>C</td><td>V</td><td>B</td><td>N</td><td>M</td><td>ENTER</td></tr>
				</table>
			</center>
			<br/>
			<br/>
			<center>
				<button id="play_newgame_button" style={{'background':'red'}} onclick="gui_newgame();">NEW GAME</button>
			</center>
		</div>
		<div className="ui_top" id="ui_stats">
			<center style={{'fontSize':'xx-large'}}>
				<span className="material-symbols-outlined"> check_circle </span> 8 &nbsp;
				<span className="material-symbols-outlined"> help </span> 1 &nbsp;
				<span className="material-symbols-outlined"> cancel </span> 2
			</center>
		</div>
		<div className="ui_top" id="ui_instructions">
			<div className="textblock"> 
				Take a look a mordle.io instructions.
			</div>
		</div>
	</div>
    );
  }
}
export { Main };
