class Album {
    constructor(element) {
        this.element = element;
    }

    init() {
        this.addClassAndEventListener();
        this.createAndAddTopElement();
    }

    addClassAndEventListener() {
        this.element.classList = 'containerAlbum';

        let elements = this.element.children;
        elements = Array.prototype.slice.call(elements);

        elements.forEach((item) => {
            item.children[0].classList = 'bottomImg';
            item.children[0].addEventListener('mouseover', this.onAddTopImage.bind(this));
        });
    }

    createAndAddTopElement() {
        let li = document.createElement('li');
        this.topImage = document.createElement('img');
        li.appendChild(this.topImage);
        this.element.insertBefore(li, this.element.children[0]);
        this.topImage.classList = 'topImg';
    }

    onAddTopImage(event) {
        let src = event.target.getAttribute('src');
        this.topImage.setAttribute('src', src);
    }
}

const album = new Album(document.getElementById('container'));

album.init();