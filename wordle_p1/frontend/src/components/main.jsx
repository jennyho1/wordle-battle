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
					<a className="ui_home" style={{'font-size':'x-large', 'text-decoration':'underline'}}>309DLE</a>
				</span>
				<span class="alignright">
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
	</div>
    );
  }
}
export { Main };
