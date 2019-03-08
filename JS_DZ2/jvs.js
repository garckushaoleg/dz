let time = 567545;
let days = (time - time%86400)/86400;
let hours = time - days*86400;
hours = (hours - hours%3600)/3600;
let minuts = time - days*86400 - hours*3600;
minuts = (minuts - minuts%60)/60;
let seconds = time - days*86400 - hours*3600 - minuts*60;

let y = {
    probel: "",
    time: "sec = ",
    days: "days",
    hours: "hrs",
    minuts: "mins",
    seconds: "secs"
}

console.log(y.probel, time, y.time, days, y.days, hours, y.hours, minuts, y.minuts, seconds, y.seconds)