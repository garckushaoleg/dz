function Accordeon(el, config){
    this.el = el;
    this.config = config;
}

//Главная функция
Accordeon.prototype.init = function () {
    this.setInitialValues();
    this.el.addEventListener('click', this.onGetBody.bind(this));
}

//Здесь я задаю начальные значения для каждого тега
Accordeon.prototype.setInitialValues = function () {
    this.accordeonBody = this.el.getElementsByClassName('accordeon-body');

    for (let i=0; i<this.accordeonBody.length; i++) {
        this.accordeonBody[i].hidden = true;
        this.accordeonBody[i].setAttribute('index', i);
        this.accordeonBody[i].setAttribute('count', 0);
    }
}

//Функция для сворачивания остальных пунктов меню
Accordeon.prototype.toСollapseOther = function (index) {

    for (let i=0; i<this.accordeonBody.length; i++) {
        if (i == index) continue;
        this.accordeonBody[i].hidden = true;
    }
}

//Открыть
Accordeon.prototype.open = function (index) {

    this.accordeonBody[index].hidden = false;
}

//Закрыть
Accordeon.prototype.close = function (index) {

    this.accordeonBody[index].hidden = true
}

//Переключить
Accordeon.prototype.toggle = function (index) {
    if (this.accordeonBody[index].hidden == true) this.accordeonBody[index].hidden = false
    else this.accordeonBody[index].hidden = true
}

//Получает значение счётчика для нажатого поля
Accordeon.prototype.getCounterValue = function (index) {

    let counterValue = this.accordeonBody[index].getAttribute('count');
    this.accordeonBody[index].setAttribute('count', ++counterValue);

    return counterValue;
}

//Обработчик
Accordeon.prototype.onGetBody = function (event) {

    itemIndexClicked = event.target.nextElementSibling.getAttribute('index');

    //Вызов open
    this.open(itemIndexClicked);

    //Вызов функции для сворачивания остальных пунктов меню
    if (this.config.collapseOther) this.toСollapseOther(itemIndexClicked);
    //Вызов close
    else if (!(this.getCounterValue(itemIndexClicked)%2)) this.close(itemIndexClicked);
}

const accordion = new Accordeon(
                        document.getElementById('container'),
                        {collapseOther: false}
                    );


accordion.init();

// accordion.open(0);
// accordion.close(0);
// accordion.open(1);
// accordion.toggle(1);