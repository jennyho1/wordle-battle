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
