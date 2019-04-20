class Img {
    constructor() {

    }

    addImg() {
        let img = document.createElement('img');
        img.setAttribute('src', 'https://media.wired.com/photos/598e35fb99d76447c4eb1f28/master/pass/phonepicutres-TA.jpg');
        img.classList = 'classImg';
        let body = document.getElementsByTagName('body');
        body[0].appendChild(img);
    }
}

const image = new Img();
image.addImg();