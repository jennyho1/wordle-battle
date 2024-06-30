function Home({ switchPage }) {

	const handleClick = () => {
		switchPage("ui_play");
	}

  return (
		<div className="ui_top">
			<div className="textblock clickable" onClick={handleClick}> 
				Classic
				<br/>
				You have 6 chances to guess a word, the first one to guess it wins!
			</div>
		</div>
  );
}

export { Home }