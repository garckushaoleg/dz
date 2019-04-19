class Album {
    constructor(element) {
        this.element = element;
    }

    init() {
        this.addClassAndEventListener();
        this.createAndAddTopElement();
    }

    addClassAndEventListener() {
        this.element.classList = 'container-album';
        this.element.addEventListener('mouseover', this.onAddTopImage.bind(this));

        let elements = this.element.children;
        elements = Array.prototype.slice.call(elements);

        elements.forEach((item) => {
            item.children[0].classList = 'album-bottom-image';
        });
    }

    createAndAddTopElement() {
        let li = document.createElement('li');
        this.topImage = document.createElement('img');
        li.appendChild(this.topImage);
        this.element.insertBefore(li, this.element.children[0]);
        this.topImage.classList = 'album-top-image';
    }

    onAddTopImage(event) {
        if (event.target.classList == 'album-bottom-image') {
            let src = event.target.src;
            this.topImage.src = src;
        }
    }
}

const album = new Album(document.getElementById('container'));

album.init();