function BallGame(el, height, width){
    this.el = el;
    this.height = height;
    this.width = width;

    this.horizontalDistance = 0;// Расстояние пройденное по горизонтали
    this.verticalDistance = 0;// Расстояние пройденное по вертикали

    this.value = true;// Использую для определения нажатого и повторно нажатого пробела
    this.stepDirection = 'right';// Использую для задания направления движения
    this.move = 10;// Величина шага

    this.init = init;
    this.transformElement = transformElement;
    this.createBall = createBall;
    this.moveBall = moveBall;
    this.onDriveBall = onDriveBall;
}

//Начало
function init() {
    this.transformElement();
    this.createBall();
    this.moveBall();
    addEventListener('keyup', onDriveBall.bind(this));
}

//Трансформация
function transformElement() {
    this.el.className = 'container';
    this.el.style.height = this.height + 'px';
    this.el.style.width = this.width + 'px';          
}

//Создание мяча
function createBall() {
    let p = document.createElement('p');
    this.p = p;
    this.el.appendChild(p);
}

//Движение мяча
function moveBall() {

    switch (this.stepDirection) {
        case 'right': this.horizontalDistance += this.move; break
        case 'left': this.horizontalDistance -= this.move; break
        case 'down': this.verticalDistance += this.move; break
        case 'up': this.verticalDistance -= this.move; break
    }

    if (this.horizontalDistance == this.width) this.horizontalDistance = 0;
    if (this.verticalDistance == this.height) this.verticalDistance = 0;
    
    if ((this.horizontalDistance < 0) && (this.stepDirection = 'left')) 
        this.horizontalDistance = this.width - this.move;
    if ((this.verticalDistance < 0) && (this.stepDirection = 'up')) 
        this.verticalDistance = this.height - this.move;
        
    this.p.style.left = this.horizontalDistance + 'px';
    this.p.style.top = this.verticalDistance + 'px';
    setTimeout(moveBall.bind(this), 1000);
}

//Событие
function onDriveBall(event) {

    if ((event.keyCode == 32) && this.value) { this.move = 0; this.value = false }
    else { this.move = 10; this.value = true }

    switch (event.keyCode) {
        case 39: this.stepDirection = 'right'; break
        case 37: this.stepDirection = 'left'; break
        case 40: this.stepDirection = 'down'; break
        case 38: this.stepDirection = 'up'; break
    }
}

const game = new BallGame(document.getElementById('container'), 400, 400);
game.init();