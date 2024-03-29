function Stats({ wins, players, losses}) {
  return (
		<div className="ui_top">
			<center style={{'fontSize':'xx-large'}}>
				<span className="material-symbols-outlined"> check_circle </span> {wins} &nbsp;
				<span className="material-symbols-outlined"> help </span> {players} &nbsp;
				<span className="material-symbols-outlined"> cancel </span> {losses}
			</center>
		</div>
  );
}

export { Stats }