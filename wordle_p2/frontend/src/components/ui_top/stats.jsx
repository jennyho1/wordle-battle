function Stats({ wins, played, losses, gameState}) {
  return (
		<div className="ui_top">
			<center style={{'fontSize':'xx-large'}}>
				<p>Last game stats:</p>
				<span className="material-symbols-outlined"> check_circle </span> {gameState.won} &nbsp;
				<span className="material-symbols-outlined"> help </span> {gameState.stillPlaying} &nbsp;
				<span className="material-symbols-outlined"> cancel </span> {gameState.lost}
			</center>
			<center style={{'fontSize':'xx-large'}}>
				<p>Classic game mode stats:</p>
				<div style={{'fontSize':'x-large'}}>
					<p>Played: {played}</p>
					<p>Correct Guesses: {wins}</p>
					<p>Games Lost: {losses}</p>
				</div>
			</center>
		</div>
  );
}

export { Stats }