import React from 'react';

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			show: false,
			result: '',
			word: '',
			won: 0,
			lost: 0,
			stillPlaying: 0,
		};
  }

	closeModal = () => {
		this.setState({show: false});
	}

	showModal = (result, word, gameState) => {
		this.setState({
			show: true, 
			result: result, 
			word: word, 
			won: result==='won' ? gameState.won - 1:  gameState.won, 
			lost: result==='lost' ? gameState.lost - 1:  gameState.lost, 
			stillPlaying: gameState.stillPlaying });
	}

	render() {
		if (this.state.show) {
			return (
				<div className="modal">
					<div className="modal-content">
						<span className="close" onClick={this.closeModal}>&times;</span>
						{this.state.result==='timeout' ? <h1>Timeout!</h1> : <h1>You {this.state.result}!</h1>}
						<p>The word to guess was: {this.state.word}</p>

						{this.state.result==='timeout' ? <p>The game has ended in a timeout and you have failed to guess the correct word in time</p> : null}
						{this.state.result==='lost' ? <p>You have failed to guess the correct word.</p> : null}

						<p>{this.state.lost} players have failed {this.state.result==='won' ? "before you made it!" : "before you!"}</p>
						{this.state.result==='lost' ? <p>{this.state.won} have guessed the word correctly</p> : <p>{this.state.won} players were faster than you!</p>}

						{this.state.result==='timeout' ? null : <p>{this.state.stillPlaying} players were still guessing!</p>}
					</div>
				</div>
			);
		}
		return null;
	}
}

export { Modal }