class Timer{
    constructor() {
        this.count = 0;
    }

    init() {
        this.key();
    }

    getValue() {
        this.el = document.getElementsByTagName('body');
    }

    start() {
        console.log(this.count);
        this.count++;
        this.time = setTimeout(this.start.bind(this), 1000);
    }

    stop() {
        clearTimeout(this.time);
        this.count = 0;
        console.log(this.count);
    }

    pause() {
        clearTimeout(this.time);
    }

    getValue() {
        clearTimeout(this.time);
        alert(this.count);
    }

    key() {
       addEventListener('keyup', this.onEvent.bind(this));
    }

    onEvent(event) {
        if (event.keyCode == 32) this.start();
        if (event.keyCode == 17) this.stop();
        if (event.keyCode == 16) this.pause();
        if (event.keyCode == 20) this.getValue();
    }
}

const timer = new Timer();
timer.init();