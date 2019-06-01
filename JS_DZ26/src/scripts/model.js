let url = new WeakMap;

export default class ToDoModel {

    get url() {
        return url.get(this);
    }

    set url(val) {
        url.set(this, val);
    }

    constructor(url, data) {
        this.url = url;
        Object.assign(this, data);
    }

    delete() {
        return fetch(`${this.url}/${this.id}`, {
            method: 'DELETE'
        })
    }
}