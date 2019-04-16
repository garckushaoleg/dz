class Gallery{
    constructor(element, delay) {
        this.element = element;
        this.config = delay;
    }

    //Главная
    init() {
        this.show(0);
        this.callFunctionWithDelay();
    }
    
    //Создаю стрелку
    createArrow() {
        let arrow = document.createElement('img');
        arrow.classList = 'sizeArrow';

        return arrow
    }
    
    //Создаю левую стрелку и навешиваю событие Предыдущий
    createArrowsLeft() {
        let arrowLeft = this.createArrow();
        arrowLeft.setAttribute('src', 'img/back.svg');
        arrowLeft.addEventListener('click', this.prev.bind(this));

        return arrowLeft;
    }

    //Создаю правую стрелку и навешиваю событие Следующий
    createArrowsRigth() {
        let arrowRight = this.createArrow();
        arrowRight.setAttribute('src', 'img/next.svg');
        arrowRight.addEventListener('click', this.next.bind(this));

        return arrowRight;
    }

    //Добавляю стрелки
    addArrows() {
        let liLast = document.createElement('li');
        let liFirst = document.createElement('li');

        liLast.appendChild(this.createArrowsRigth());
        liFirst.appendChild(this.createArrowsLeft());

        this.element.appendChild(liLast);
        this.element.insertBefore(liFirst, this.element.children[0]);
    }

    //Показываю заданную картинку вместе с кнопками
    show(index) {
        this.addArrows();

        let elements = this.element.children;
        elements = Array.prototype.slice.call(elements);

        if (index !== undefined) this.index = index;

        elements.forEach((item, i) => {

            if((i == 0) || (i == (elements.length-1))) item.children[0].classList = 'sizeArrow'
            else item.children[0].classList = 'sizeImg'

            if ((i !== this.index) && (i !== 0) && (i !== (elements.length-1))) {
                item.classList = 'close';
            }
        })
    }

    //Вызов функции с задержкой
    callFunctionWithDelay() {
        this.next();

        setTimeout(this.callFunctionWithDelay.bind(this), this.config.delay);
    }

    //Следующий
    next() {
        if (this.index == (this.element.children.length-2)) {
            this.element.children[this.index].classList = 'close';
            this.element.children[1].classList = 'open';
            this.index = 0;
        } else this.element.children[this.index+1].classList = 'open';

        if (this.index>0) this.element.children[this.index].classList = 'close';

        this.index++;
    }

    //Предыдущий
    prev() {
        if (this.index <= 1) {
            this.element.children[1].classList = 'close';
            this.index = this.element.children.length-1;
        } else this.element.children[this.index].classList = 'close';
        
        this.element.children[this.index-1].classList = 'open';

        this.index--;
    }
}


const myGallery = new Gallery(document.getElementById('container'), {delay: 3000});

myGallery.init();
                    
// myGallery.show(2);
// myGallery.next();
// myGallery.prev();
// myGallery.prev();
// myGallery.prev();