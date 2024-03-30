import { useEffect, useState } from 'react';
import React from 'react';


const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  return [minutes, seconds];
};


const CountdownTimer = ({ targetDate }) => {
  const [minutes, seconds] = useCountdown(targetDate);

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


function GameState({ state, enable }) {

	if (!enable) {
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
				<CountdownTimer targetDate={new Date(state.endTime)} />
			</center>
		</div>
  );
}

export { GameState }



