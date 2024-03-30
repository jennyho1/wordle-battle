import React from 'react';
import { GameState } from './gameState'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const colors = ['#000000', '#4b4b4b', '#fdb731', '#00dc00'];

function Key({ val, onKeyPress, color }) {
  return (<td onClick={() => onKeyPress(val)} style={{background:color}}>{val}</td>);
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
				{/* <GameState wins={1} players={1} losses={1} timeLeft={299}/> */}
				<GameState state={this.props.gameState} enable={this.props.guiState.enable}/>
			</center>
			<center>
				<table className="letterbox">
					<tbody>
						{this.props.guiState.letterbox.map((row, rowIndex) => (
							<tr className={'row'+rowIndex} key={rowIndex}>
								{row.map((cell, colIndex) => (
									<td className={'col'+colIndex} key={colIndex} style={{background: colors[this.props.guiState.boardColors[rowIndex][colIndex]]}}>{cell}</td>
								))}
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
								<Key val={c} onKeyPress={this.handleKeyPress} key={index} color={colors[this.props.guiState.alphabetMap[c]]}/>
							))}
						</tr>
					</tbody>
				</table>
				<table className="keyboardrow">
					<tbody>
						<tr>
							{['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((c, index) => (
								<Key val={c} onKeyPress={this.handleKeyPress} key={index} color={colors[this.props.guiState.alphabetMap[c]]}/>
							))}
						</tr>
					</tbody>
				</table>
				<table className="keyboardrow">
					<tbody>
						<tr>
							{['DEL', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER'].map((c, index) => (
								<Key val={c} onKeyPress={this.handleKeyPress} key={index} color={colors[this.props.guiState.alphabetMap[c]]}/>
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
			<ToastContainer />
		</div>
    );
  }
}

export { Play }