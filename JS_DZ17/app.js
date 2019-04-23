class Tabset{
    constructor(element) {
        this.element = element;
    }

    //Показать таб
    show(index) {
        if (index == undefined) this.index = 0
        else this.index = --index;

        this.element.classList.add('tabset-container');

        this.elements = Array.prototype.slice.call(this.element.children);
        
        this.elements.forEach((item, i) => {
            item.children[1].classList.add('tabset-body-close');

            if (this.index == i) {
                item.children[0].classList.add('tabset-heading-activate');

                let openTab = item.children[1].cloneNode(true);

                openTab.classList.remove('tabset-body-close');
                openTab.classList.add('tabset-body-open');

                this.elements[0].appendChild(openTab);
            }
            else {
                item.children[0].classList.add('tabset-heading-deactivate');
            }
        });

        this.element.addEventListener('click', this.onOpenTab.bind(this));
    }

    //Обработчик клика
    onOpenTab() {
        this.parentElement = event.target.parentElement;

        this.open();
    }

    //Деактивировать все heading
    deactivateAllHeading() {
        this.elements.forEach( (item, i) => {
            if (this.parentElement == item) this.index = i;
            item.children[0].classList.remove('tabset-heading-activate');
            item.children[0].classList.add('tabset-heading-deactivate');
        })
    }

    //Открыть таб
    open() {
        this.deactivateAllHeading();
        let headingElement = this.element.children[this.index].children[0];

        if (headingElement.classList == 'tabset-heading tabset-heading-deactivate') {

            headingElement.classList.remove('tabset-heading-deactivate');
            headingElement.classList.add('tabset-heading-activate');

            let bodyElement = headingElement.nextElementSibling;

            let bodyElementClone = bodyElement.cloneNode(true);
            bodyElementClone.classList.remove('tabset-body-close');
            bodyElementClone.classList.add('tabset-body-open');

            this.element.children[0].children[2].remove();
            this.element.children[0].appendChild(bodyElementClone);

        }
    }

    //Следующий таб
    next() {
        this.index++;
        if (this.index == this.element.children.length) this.index = 0;
        this.open();
    }

    //Предыдущий таб
    prev() {
        if (this.index == 0) this.index = this.element.children.length-1
        else this.index--;
        this.open();
    }
}

const tabs = new Tabset(document.getElementById('container'));

tabs.show();
// tabs.show(2);
// tabs.next();
// tabs.prev();
// tabs.prev();
