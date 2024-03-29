function Instructions() {
  return (
		<div className="ui_top">
			<div className="textblock"> 
				<div className="howtoplay">
					<h1>How to play</h1>
				</div>
				<h3>Solo game mode</h3>
				<p>Guess the word in 6 tries.</p>
				<ul>
					<li>Each guess must be a valid 5-letter word.</li>
					<li>The color of the tiles will change to show how close your guess was to the word.</li>
				</ul>
				<hr/>
				<h3>Letter indication examples</h3>
				<p>The letter E is in the correct position.</p>
				<table className="letterbox">
					<tbody>
						<tr><td>H</td><td style={{background:"#00dc00"}}>E</td><td>L</td><td>L</td><td>O</td></tr>
					</tbody>
				</table>
				<p>The letter A is in an incorrect position.</p>
				<table className="letterbox">
					<tbody>
						<tr><td style={{background:"#fdb731"}}>A</td><td>B</td><td>O</td><td>U</td><td>T</td></tr>
					</tbody>
				</table>
				<p>The letter C and E are not in the word.</p>
				<table className="letterbox">
					<tbody>
						<tr><td>S</td><td>A</td><td>U</td><td style={{background:"#4b4b4b"}}>C</td><td style={{background:"#4b4b4b"}}>E</td></tr>
					</tbody>
				</table>
			</div>
		</div>
  );
}

export { Instructions }