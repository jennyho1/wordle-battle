import { useEffect, useState } from 'react';
import React from 'react';


const useCountdown = (endDate, enable) => {
  const countDownDate = new Date(endDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
			if (enable){
				setCountDown(countDownDate - new Date().getTime());
			}
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate, enable]);

	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  return [minutes, seconds];
};


const CountdownTimer = ({ endDate, enable }) => {
  const [minutes, seconds] = useCountdown(endDate, enable);

  if (minutes + seconds <= 0) {
    return (
			<span>
				00:00
			</span>
		);
  } else {
    return (
      <span>
				{minutes<10 ? '0'+minutes : minutes}:{seconds<10 ? '0'+seconds : seconds}
    	</span>
    );
  }
};


function GameState({ state, show, enable }) {

	if (!show) {
		return null;
	}

  return (
		<div className="ui_top">
			<center style={{'fontSize':'xx-large'}}>
				<div style={{'borderBottom': '2px solid rgba(255, 255, 255, 0.3)', 'width': 'fit-content', 'padding': '10px'}}>
					<span className="material-symbols-outlined"> check_circle </span> {state.won} &nbsp;
					<span className="material-symbols-outlined"> help </span> {state.stillPlaying} &nbsp;
					<span className="material-symbols-outlined"> cancel </span> {state.lost}
				</div>
			</center>
			<center style={{'fontSize':'xx-large', 'padding': '10px'}}>
				<span className="material-symbols-outlined"> schedule </span> &nbsp;
				<CountdownTimer endDate={new Date(state.endTime)} enable={enable} />
				{/* <CountdownTimer timeRemaining={state.timeRemaining} enable={enable} /> */}
			</center>
		</div>
  );
}

function AllPlayers({ state, show, username }) {

	if (!show) {
		return null;
	}

  return (
		<center>
			<div className="ui_top" style={{'borderBottom': '2px solid rgba(255, 255, 255, 0.3)', 'width':"70%", 'padding':'25px'}}>
					Up against {state.players.length - 1} other player(s)!
			</div>
			<div>
				<h2>Players</h2>
				<ul>
					{state.players.map((player, index) => (
						player === username ? <li className='you'>{player} - you</li> : <li className='other'>{player}</li>
					))}
				</ul>
				
			</div>
		</center>
  );
}


export { GameState, AllPlayers }



