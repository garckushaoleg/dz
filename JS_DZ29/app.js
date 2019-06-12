const socket = new WebSocket('ws://fep-app.herokuapp.com');

let canvas = document.getElementById('ball');
let ctx = canvas.getContext("2d");

let color = document.getElementById('color');
let range = document.getElementById('range');


let ballPayload;
let allBalls = new Map();

let initialRadius = 10;
let xAxisStep = 0;
let yAxisStep = 0;

let stepDirection;

socket.onopen = function () {
    let dataPacket = {
        action: 'move',
        payload: { x: 0, y: 0 }
    }
    socket.send(JSON.stringify(dataPacket));

    dataPacket = {
        action: 'setState',
        payload: { radius: range.value, color: color.value }
    }

    socket.send(JSON.stringify(dataPacket));
}

addEventListener('keydown', onDriveBall);
addEventListener('keyup', onMove);
color.addEventListener('input', onSetState);
range.addEventListener('mouseup', onSetState);

socket.onmessage = function (e) {
    let obj = JSON.parse(e.data);

    createObjectOfAllBalls(obj);

    displayBall();
}


//Создать объект из всех мячей
function createObjectOfAllBalls(obj) {

    let id = obj.ballId;

    if (obj.action === 'add') {

        allBalls.set(obj.ballId, obj);

    } else {

        let prevStateOfObj = allBalls.get(id);

        switch (obj.action) {

            case 'move':
                obj.payload.color = prevStateOfObj.payload.color;
                obj.payload.radius = prevStateOfObj.payload.radius;
                break;

            case 'setState':
                obj.payload.x = prevStateOfObj.payload.x;
                obj.payload.y = prevStateOfObj.payload.y;
                break;
        }

        if (obj.action != 'remove') allBalls.set(obj.ballId, obj);
    }
}

//Показать мяч
function displayBall() {

    let differenceResult;

    ctx.clearRect(0, 0, 600, 600);

    for (let value of allBalls.values()) {
        ctx.beginPath();
        ballPayload = value.payload;

        differenceResult = ballPayload.radius - initialRadius;
        ctx.arc(initialRadius + ballPayload.x + differenceResult, initialRadius + ballPayload.y + differenceResult, ballPayload.radius, 0, Math.PI * 2);

        ctx.fillStyle = ballPayload.color;
        ctx.fill();

        ctx.closePath();
    }

    moveBall(differenceResult);
}

//Передвигать мяч
function moveBall(differenceResult) {
    if ((initialRadius + ballPayload.x + differenceResult) > (600 - ballPayload.radius)) stepDirection = 'left';
    if ((initialRadius + ballPayload.y + differenceResult) > (600 - ballPayload.radius)) stepDirection = 'up';
    if ((initialRadius + ballPayload.x + differenceResult) < ballPayload.radius) stepDirection = 'right';
    if ((initialRadius + ballPayload.y + differenceResult) < ballPayload.radius) stepDirection = 'down';

    switch (stepDirection) {
        case 'right': ballPayload.x += 1; break
        case 'left': ballPayload.x -= 1; break
        case 'down': ballPayload.y += 1; break
        case 'up': ballPayload.y -= 1; break
    }

}

//Обработчик на движение
function onMove() {
    let dataPacket = {
        action: 'move',
        payload: { x: ballPayload.x, y: ballPayload.y }
    }
    socket.send(JSON.stringify(dataPacket));
}

//Обработчик на установку состояния
function onSetState() {
    let dataPacket = {
        action: 'setState',
        payload: { radius: range.value, color: color.value }
    }

    socket.send(JSON.stringify(dataPacket));
}

//Обработчик на передвижение мяча
function onDriveBall(e) {
    switch (e.keyCode) {
        case 39: stepDirection = 'right'; break
        case 37: stepDirection = 'left'; break
        case 40: stepDirection = 'down'; break
        case 38: stepDirection = 'up'; break
    }

    displayBall();
}