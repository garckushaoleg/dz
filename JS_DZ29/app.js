const socket = new WebSocket('ws://fep-app.herokuapp.com');

let canvas = document.getElementById('ball');
let ctx = canvas.getContext("2d");

let color = document.getElementById('color');
let range = document.getElementById('range');

let allBalls = new Map();

const MY_BALL_PAYLOAD = {
    x: 10, 
    y: 10, 
    radius: range.value, 
    color: color.value
};

socket.onopen = function () {
    socket.send(JSON.stringify(createPackageMove(MY_BALL_PAYLOAD.x, MY_BALL_PAYLOAD.y)));

    socket.send(JSON.stringify(createPackageSetState(MY_BALL_PAYLOAD.radius, MY_BALL_PAYLOAD.color)));
}

addEventListener('keyup', onDriveBall);
addEventListener('keyup', onMove);
color.addEventListener('input', onSetState);
range.addEventListener('mouseup', onSetState);

socket.onmessage = function (e) {
    let obj = JSON.parse(e.data);

    changeStateOfBall(obj);

    displayAllBalls();
}


//Изменить сосотояние мяча
function changeStateOfBall(obj) {

    let id = obj.ballId;
    let prevStateOfObj;

    switch (obj.action) {

        case 'move':
            prevStateOfObj = allBalls.get(id);
            obj.payload.color = prevStateOfObj.payload.color;
            obj.payload.radius = prevStateOfObj.payload.radius;
            allBalls.set(obj.ballId, obj);
            break;

        case 'setState':
            prevStateOfObj = allBalls.get(id);
            obj.payload.x = prevStateOfObj.payload.x;
            obj.payload.y = prevStateOfObj.payload.y;
            allBalls.set(obj.ballId, obj);
            break;

        default:
            allBalls.set(obj.ballId, obj);
    }
}

//Показать мячи
function displayAllBalls() {

    ctx.clearRect(0, 0, 600, 600);

    for (let value of allBalls.values()) {
        if (value.action !== 'remove') {
            ctx.beginPath();

            let ballPayload = value.payload;

            ctx.arc(ballPayload.x, ballPayload.y, ballPayload.radius, 0, Math.PI * 2);

            ctx.fillStyle = ballPayload.color;
            ctx.fill();

            ctx.closePath();
        }
    }
}

//Передвигать свой мяч
function moveBall(stepDirection) {
    if (MY_BALL_PAYLOAD.x > (600 - range.value)) stepDirection = 'left';
    if (MY_BALL_PAYLOAD.y > (600 - range.value)) stepDirection = 'up';
    if (MY_BALL_PAYLOAD.x < range.value) stepDirection = 'right';
    if (MY_BALL_PAYLOAD.y < range.value) stepDirection = 'down';

    switch (stepDirection) {
        case 'right': MY_BALL_PAYLOAD.x += 20; break
        case 'left': MY_BALL_PAYLOAD.x -= 20; break
        case 'down': MY_BALL_PAYLOAD.y += 20; break
        case 'up': MY_BALL_PAYLOAD.y -= 20; break
    }

}

//Создать пакет данных move
function createPackageMove(x, y) {
    return {
        action: 'move',
        payload: { x: x, y: y }
    }
}

//Создать пакет данных setState
function createPackageSetState(radius, color) {
    return {
        action: 'setState',
        payload: { radius: radius, color: color }
    }
}

//Обработчик на движение
function onMove() {
    socket.send(JSON.stringify(createPackageMove(MY_BALL_PAYLOAD.x, MY_BALL_PAYLOAD.y)));
}

//Обработчик на установку состояния
function onSetState() {
    socket.send(JSON.stringify(createPackageSetState(range.value, color.value)));
}

//Обработчик на передвижение своего мяча
function onDriveBall(e) {
    switch (e.keyCode) {
        case 39: stepDirection = 'right'; break
        case 37: stepDirection = 'left'; break
        case 40: stepDirection = 'down'; break
        case 38: stepDirection = 'up'; break
    }

    moveBall(stepDirection);
}