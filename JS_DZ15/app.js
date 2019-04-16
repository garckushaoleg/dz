class Gallery{
    constructor(element, delay) {
        this.element = element;
        this.delay = delay;

        this.index = 0;
    }

    //Главная
    init() {
        this.show(0);
        this.createRecursion();
    }
    
    //Создаю стрелку
    createArrow() {
        let arrow = document.createElement('img');
        arrow.classList = 'sizeArrow';
        return arrow
    }
    
    //Добавляю левую стрелку и навешиваю событие Предыдущий
    addArrowsLeft() {
        let arrowLeft = this.createArrow();
        arrowLeft.setAttribute('src', 'img/back.svg');
        arrowLeft.addEventListener('click', this.prev.bind(this));

        return arrowLeft;
    }

    //Добавляю правую стрелку и навешиваю событие Следующий
    addArrowsRigth() {
        let arrowRight = this.createArrow();
        arrowRight.setAttribute('src', 'img/next.svg');
        arrowRight.addEventListener('click', this.next.bind(this));

        return arrowRight;
    }

    //Скрываю все лишки кроме одной
    show(index) {
        let element = this.element.children;
        element = Array.prototype.slice.call(element);

        if (index !== undefined) this.index = index;
        element.forEach((item, i) => {
            item.firstChild.classList = 'sizeImg';
            item.insertBefore(this.addArrowsLeft(), item.firstChild);
            item.appendChild(this.addArrowsRigth());
            if (i !== (this.index-1)) item.classList = 'close';
        })
    }

    //Вызываю Следующий в рекурсии
    createRecursion() {
        this.next();

        setTimeout(this.createRecursion.bind(this), this.delay.delay);
    }

    //Следующий
    next() {
        if (this.index>(this.element.children.length-1)) {
            this.element.children[this.index-1].classList = 'close';
            this.element.children[0].classList = 'open';
            this.index = 0;
        } else this.element.children[this.index].classList = 'open';

        if (this.index>0) this.element.children[this.index-1].classList = 'close';
        
        this.index++;
    }

    //Предыдущий
    prev() {
        this.index--;
        if (!this.index) {
            this.element.children[0].classList = 'close';
            this.index = this.element.children.length;
        } else this.element.children[this.index].classList = 'close';

        this.element.children[this.index-1].classList = 'open';
    }
}


const myGallery = new Gallery(document.getElementById('container'), {delay: 4000});

myGallery.init();
                    
// myGallery.show(2);
// myGallery.next();
// myGallery.prev();
// myGallery.prev();
// myGallery.prev();