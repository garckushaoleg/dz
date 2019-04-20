class Square {
    constructor (amount) {
        this.amount = amount;
        this.count = [];
    }

    init() {
        this.addSquare();
        this.addArr();
        this.event();
    }

    createSquare() {
        let square = document.createElement('div');
        square.classList = 'square';
        square.textContent = 0;

        return square
    }

    addSquare() {
        for (let i=0; i<this.amount; i++) {
            document.body.appendChild(this.createSquare());
        }
    }

    addArr() {
        this.el = document.getElementsByTagName('body');
        let el = this.el[0].children;

        for (let i=0; i<el.length; i++) {
            this.count.push(0);
        }

        this.arr = Array.prototype.slice.call(el);
    }

    event() {
        this.el[0].addEventListener('click', this.addValueCount.bind(this));
    }

    addValueCount(event) {
        this.arr.forEach((item, i) => {
            if (item == event.target) {
                let value = this.count[i]; 
                value++;
                this.count[i] = value;
                item.textContent = value;
            }
        });
    }

}

const kv = new Square(5);
kv.init();