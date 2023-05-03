import dayjs from "dayjs";

function padWithZeros(number, minLength){
    const numberString = number.toString();

    if(numberString.length >= minLength) return numberString;
    return "0".repeat(minLength - numberString.length) + numberString;
}

function getRemainingSeconds(nowDayjs, timestampDayjs){
    return padWithZeros(
        timestampDayjs.diff(nowDayjs, "seconds") % 60,
        2
    );
}

function getRemainingMinutes(nowDayjs, timestampDayjs){
    return padWithZeros(
        timestampDayjs.diff(nowDayjs, "minutes") % 60,
        2
    );
}

function getRemainingHours(nowDayjs, timestampDayjs){
    return padWithZeros(
        timestampDayjs.diff(nowDayjs, 'hours') % 24,
        2
    );
}

function getRemainingDays(nowDayjs, timestampDayjs){
    return timestampDayjs.diff(nowDayjs, 'days').toString();    
}

export function getRemainingTimeUntilMsTimestamp(timesampMS){
    const timestampDayjs = dayjs(timesampMS);
    const nowDayjs = dayjs();

    if(timestampDayjs.isBefore(nowDayjs)) return{
        seconds: "00",
        minutes: "00",
        hours: "00",
        days: "00"
    };

    return{
        seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
        minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
        hours: getRemainingHours(nowDayjs, timestampDayjs),
        days: getRemainingDays(nowDayjs, timestampDayjs)
    };
}