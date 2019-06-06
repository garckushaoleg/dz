let url = new WeakMap;

export default class TodoListModel {

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

    rewrite() {
        return fetch(`${this.url}/${this.id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        })
    }

    write() {
        return fetch(`${this.url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this)
        })
    }
}