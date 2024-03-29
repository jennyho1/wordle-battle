import React from 'react';

class Modal extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			show: false,
			result: '',
			word: ''
		};
  }

	closeModal = () => {
		this.setState({show: false});
	}

	showModal = (result, word) => {
		this.setState({show: true, result: result, word: word});
	}

	render() {
		if (this.state.show) {
			return (
				<div className="modal">
					<div className="modal-content">
						<span className="close" onClick={this.closeModal}>&times;</span>
						<h1>You {this.state.result}!</h1>
						<p>The word to guess was: {this.state.word}</p>
					</div>
				</div>
			);
		}
		return null;
	}
}

export { Modal }