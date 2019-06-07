let canvas = document.getElementById('ball');
let ctx = canvas.getContext("2d");

let color = document.getElementById('color');
let range = document.getElementById('range');

let initialRadius = 10;

let xAxisStep = 0;
let yAxisStep = 0;

let stepDirection = 'right';

function init() {
    displayBall();
    addEventListener('keyup', onDriveBall);
}

function displayBall() {
    let differenceResult = range.value - initialRadius;

    ctx.clearRect(0, 0, 600, 600);
    ctx.beginPath();

    ctx.arc(initialRadius + xAxisStep + differenceResult, initialRadius + yAxisStep + differenceResult, range.value, 0, Math.PI * 2);

    ctx.fillStyle = color.value;
    ctx.fill();
    ctx.closePath();

    moveBall(differenceResult);

    setTimeout(displayBall, 10);
}

function moveBall(differenceResult) {

    switch (stepDirection) {
        case 'right': xAxisStep+=1; break
        case 'left': xAxisStep-=1; break
        case 'down': yAxisStep+=1; break
        case 'up': yAxisStep-=1; break
    }

    if ((initialRadius + xAxisStep + differenceResult) > (600 - range.value)) stepDirection='left';
    if ((initialRadius + yAxisStep + differenceResult) > (600 - range.value)) stepDirection='up';
    if ((initialRadius + xAxisStep + differenceResult) < range.value) stepDirection='right';
    if ((initialRadius + yAxisStep + differenceResult) < range.value) stepDirection='down';
}

function onDriveBall(e) {
    switch (e.keyCode) {
        case 39: stepDirection = 'right'; break
        case 37: stepDirection = 'left'; break
        case 40: stepDirection = 'down'; break
        case 38: stepDirection = 'up'; break
    }
}

init();