class Tabset{
    constructor(element) {
        this.element = element;
        this.init();
    }

    //Перемещаем все body элементы
    moveBodyElements() {
        this.element.classList.add('tabset-container');

        //Создаю контейнер для body
        this.cntForDisplacedBodies = document.createElement('div');
        document.body.appendChild(this.cntForDisplacedBodies);

        this.elements = Array.prototype.slice.call(this.element.children);

        //Закрываю и перемещаю все body в контейнер
        this.elements.forEach ((item, i) => {
            let bodyElement = item.children[1];
            bodyElement.classList.add('tabset-body-close');
            this.cntForDisplacedBodies.appendChild(bodyElement);
        })
    }

    //Показать Таб
    show(index) {
    
        if (index == undefined) { 
            this.index = 0;
        }
        else { 
            this.index = --index;
        }

        this.open();
    }

    //Инициализация
    init() {
        this.moveBodyElements();
        this.show();
        this.element.addEventListener('click', this.onOpenTab.bind(this));
    }

    //Обработчик
    onOpenTab(event) {
        let parent = event.target.parentElement;
        
        //Узнаю индекс родительского элемента
        if (~this.elements.indexOf(parent)) {
            this.index = this.elements.indexOf(parent);
        }

        this.open();
    }

    //Открыть таб
    open() {
        
        // Создаю массив из дочерних элементов контейнера перемещённых body
        let cntForDisplacedBodies = Array.prototype.slice.call(this.cntForDisplacedBodies.children);

        //Закрываю все body
        cntForDisplacedBodies.forEach((item, i) => {
            item.className = 'tabset-body tabset-body-close';
        })

        this.deactivateAllHeading();

        //Активирую необходивый heading и открываю необходимый body
        this.elements[this.index].children[0].classList.remove('tabset-heading-deactivate');
        this.elements[this.index].children[0].classList.add('tabset-heading-activate');

        cntForDisplacedBodies[this.index].classList.remove('tabset-body-close');
        cntForDisplacedBodies[this.index].classList.add('tabset-body-open');
    }

    //Деактивировать все heading
    deactivateAllHeading() {
        this.elements.forEach( (item, i) => {
            if (this.parentElement == item) this.index = i;
            item.children[0].classList.remove('tabset-heading-activate');
            item.children[0].classList.add('tabset-heading-deactivate');
        })
    }

    //Следующий таб
    next() {
        this.index++;
        
        if (this.index == this.element.children.length) {
            this.index = 0;
        }
        this.open();
    }

    //Предыдущий таб
    prev() {
        if (this.index == 0) {
            this.index = this.element.children.length-1;
        }
        else {
            this.index--;
        }
        this.open();
    }
}

const tabs = new Tabset(document.getElementById('container'));


// tabs.show(3);
// tabs.next();
// tabs.next();
// tabs.prev();
// tabs.prev();
// tabs.prev();
// tabs.prev();
