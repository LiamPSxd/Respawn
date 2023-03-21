import './timer.css';
import React  from 'react';
import CountdownTimer from './CoundownTimer'
const Timer = () => {
    return (
        <div className="App">
            <h1>Tiempo restante:</h1> 
         <CountdownTimer
         countdownTimestampMs={1679378400000}/>
        </div>
      );
}
export default Timer;