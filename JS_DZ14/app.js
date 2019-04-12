function Accordeon(el, config){
    this.el = el;
    this.config = config;

    this.count = 0;
}
//Главная функция
Accordeon.prototype.init = function () {
    Accordeon.prototype.hiddenBody.call(this);
    this.el.addEventListener('click', onGetBody.bind(this));
}

//Здесь я присваиваю индексы и счётчики
Accordeon.prototype.hiddenBody = function () {
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

//Обработчик
function onGetBody(event) {

    itemIndexClicked = event.target.nextElementSibling.getAttribute('index');

    //Основное задание
    if (this.config.collapseOther) Accordeon.prototype.toСollapseOther.call(this, itemIndexClicked);

    //Дополнительное задание
    //Вызов open
    Accordeon.prototype.open.call(this, itemIndexClicked);
    let counterValue = this.accordeonBody[itemIndexClicked].getAttribute('count');
    this.accordeonBody[itemIndexClicked].setAttribute('count', ++counterValue);
    
    //Вызов close
    if (!this.config.collapseOther) {
        let counterValue = this.accordeonBody[itemIndexClicked].getAttribute('count');
        if (!(counterValue%2)) Accordeon.prototype.close.call(this, itemIndexClicked);
    }
}

const accordion = new Accordeon(
                        document.getElementById('container'),
                        {collapseOther: false}
                    );


accordion.init();
// accordion.open(1);
// accordion.close(0);
// accordion.toggle(1);
