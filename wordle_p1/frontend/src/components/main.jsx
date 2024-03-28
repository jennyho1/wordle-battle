/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { api_getUsername, api_guess, api_newgame }  from './api'; 

class Header extends React.Component {
  constructor(props) {
    super(props);
		this.state = {
			pagename : "ui_home"
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


class Home extends React.Component {
  render() {
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
}

class Username extends React.Component {
  render() {
    return (
		<div className="ui_top" id="ui_username">
			<h2>username: <span id="username"></span></h2>
		</div>
    );
  }
}

function Key({ val }) {
  function keyPress() {
    console.log(val);
  }
  return (
    <td onClick={keyPress}>{val}</td>
  );
}

class Play extends React.Component {
  render() {
    return (
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
					<tr><Key val={'Q'}/><Key val={'W'}/><Key val={'E'}/><Key val={'R'}/><Key val={'T'}/><Key val={'Y'}/><Key val={'U'}/><Key val={'I'}/><Key val={'O'}/><Key val={'P'}/></tr>
				</table>
				<table className="keyboardrow">
					<tr><Key val={'A'}/><Key val={'S'}/><Key val={'D'}/><Key val={'F'}/><Key val={'G'}/><Key val={'H'}/><Key val={'J'}/><Key val={'K'}/><Key val={'L'}/></tr>
				</table>
				<table className="keyboardrow">
					<tr><Key val={'DEL'}/><Key val={'Z'}/><Key val={'X'}/><Key val={'C'}/><Key val={'V'}/><Key val={'B'}/><Key val={'N'}/><Key val={'M'}/><Key val={'ENTER'}/></tr>
				</table>
			</center>
			<br/>
			<br/>
			<center>
				<button id="play_newgame_button" style={{'background':'red'}} onclick="gui_newgame();">NEW GAME</button>
			</center>
		</div>
    );
  }
}

class Stats extends React.Component {
  render() {
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
}

class Instruction extends React.Component {
  render() {
    return (
		<div className="ui_top" id="ui_instructions">
			<div className="textblock"> 
				Take a look a mordle.io instructions.
			</div>
		</div>
    );
  }
}

function UI({ name }) {
  if (name === "ui_home") {
    return <Home />;
  } else if (name === "ui_username") {
    return <Username />;
  } else if (name === "ui_play") {
    return <Play />;
  } else if (name === "ui_stats") {
    return <Stats />;
  } else if (name === "ui_instructions") {
    return <Instruction />;
  } 
}


class Main extends React.Component {
  constructor(props) {
    	super(props);
    	this.state = { 
				pagename: "ui_home"
			}
  }
	handleSwitch = (name) => {
		this.setState({pagename: name});
	}

  render() {
    return (
	<div>
		<Header switch={this.handleSwitch}/>
		<UI name={this.state.pagename}/>
	</div>
    );
  }
}
export { Main };
