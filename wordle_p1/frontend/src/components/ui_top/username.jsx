function Username({ user }) {
  return (
		<div className="ui_top">
			<h2>username: <span id="username">{user}</span></h2>
		</div>
  );
}

export { Username }