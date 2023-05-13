import React, { useState, useEffect } from "react";
import style from "./Oferta.module.css";
import { getRemainingTimeUntilMsTimestamp } from "./utils/CountdownTimer";

const OfertaTimer = ({ countdownTimestampMs }) => {
    const initialState = {
        seconds: "00",
        minutes: "00",
        hours: "00",
        days: "00"
    };

    const [remainingTime, setRemainingTime] = useState(initialState);

    const updateRemainingTime = (countdown) => setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return(
        <><div id={style.countdownTimer}>
            <span>{remainingTime.days}</span>
            <span>dias</span>
            <span id={style.twoNumbers}>{remainingTime.hours}</span>
            <span>horas</span> 
            <br/><span id={style.twoNumbers}>{remainingTime.minutes}</span> 
            <span>minutos</span>
            <span id={style.twoNumbers}>{remainingTime.seconds}</span>
            <span>segundos</span>
        </div></>
    );
};

export default OfertaTimer;