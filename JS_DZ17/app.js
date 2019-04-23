class Tabset{
    constructor(element) {
        this.element = element;
    }

    //Перемещаем все body элементы
    moveBodyElements() {
        this.element.classList.add('tabset-container');
        this.elements = Array.prototype.slice.call(this.element.children);

        //Закрываю все body и перемещаю все body, кроме body первого пункта, в первый пункт
        this.elements.forEach ((item, i) => {
            let bodyElement = item.children[1];
            bodyElement.classList.add('tabset-body-close');
            if (!i) {
                return;
            }
            this.element.children[0].appendChild(bodyElement);
        })
    }

    //Показать Таб
    show(index) {
        this.moveBodyElements();
        
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
        this.show();
        this.element.addEventListener('click', this.onOpenTab.bind(this));
    }

    //Обработчик
    onOpenTab() {
        let parent = event.target.parentElement;
        
        //Узнаю индекс родительского элемента
        this.elements.forEach((item, i ) => {
            if (parent == item) {
                this.index = i;
            }
        })

        this.open();
    }

    //Открыть таб
    open() {
        // Создаю массив из дочерних элементов первого пункта
        this.elementsFirstItem = Array.prototype.slice.call(this.element.children[0].children);

        //Закрываю все дочерние элементы первого пункта кроме нулевого, т.е. кроме heading
        this.elementsFirstItem.forEach((item, i) => {
            if (!i) {
                return;
            }
            item.className = 'tabset-body tabset-body-close';
        })

        this.deactivateAllHeading();

        //Активирую необходивый heading и открываю необходимый body
        this.elements.forEach((item, i ) => {
            if (this.index == i) {
                item.children[0].classList.remove('tabset-heading-deactivate');
                item.children[0].classList.add('tabset-heading-activate');

                this.element.children[0].children[i+1].classList.remove('tabset-body-close');
                this.element.children[0].children[i+1].classList.add('tabset-body-open');
            }
        })
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

tabs.init();
// tabs.show(2);
// tabs.next();
// tabs.next();
// tabs.prev();
// tabs.prev();
// tabs.prev();
// tabs.prev();
