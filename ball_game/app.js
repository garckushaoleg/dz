function BallGame(el, height, width){
    this.el = el;
    this.height = height;
    this.width = width;

    this.horizontalDistance = 0;// Расстояние пройденное по горизонтали
    this.verticalDistance = 0;// Расстояние пройденное по вертикали

    this.init = init;
}

//Начало
function init() {
    transformElement.call(this);
    createBall.call(this);
    moveBall.call(this);
}

//Трансформация
function transformElement() {
    this.el.setAttribute('style', 'position: relative; height:' + this.height + 'px; width:' + this.width +
                            'px; border: 1px solid black; background: rgba(0, 0, 0, 0.1)');              
}

//Создание мяча
function createBall() {
    let p = document.createElement('p');
    this.p = p;
    this.el.appendChild(p);
}

//Движение мяча
function moveBall() {

    switch (stepDirection) {
        case 'right': this.horizontalDistance += move; toggle = 0; break
        case 'left': this.horizontalDistance -= move; toggle = 1; break
        case 'down': this.verticalDistance += move; toggle = 0; break
        case 'up': this.verticalDistance -= move; toggle = 1; break
    }

    if (this.horizontalDistance == this.width) this.horizontalDistance = 0;
    if (this.verticalDistance == this.height) this.verticalDistance = 0;
    if ((this.horizontalDistance < 0) && toggle) this.horizontalDistance = this.width - move;
    if ((this.verticalDistance < 0) && toggle) this.verticalDistance = this.height - move;

    this.p.setAttribute('style', 'position: absolute;' + 'left: ' + this.horizontalDistance + 'px;' 
                                                       + 'top: ' + this.verticalDistance + 'px;');

    setTimeout(moveBall.bind(this), 1000);
}

//Событие
function onDriveBall(event) {

    if ((event.keyCode == 32) && value) { move = 0; value = false }
    else { move = 10; value = true }

    switch (event.keyCode) {
        case 39: stepDirection = 'right'; break
        case 37: stepDirection = 'left'; break
        case 40: stepDirection = 'down'; break
        case 38: stepDirection = 'up'; break
    }
}

//Глобальные переменные
let value = true;// Использую для определения нажатого и повторно нажатого пробела
let stepDirection = 'right';// Использую для задания направления движения
let toggle = 0;//Переключатель, 0 - вправо и вниз, 1 - влево и вверх
let move = 10;// Величина шага

const game = new BallGame(document.getElementById('container'), 400, 400);
addEventListener('keyup', onDriveBall);
game.init();