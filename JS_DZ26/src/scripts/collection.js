import ToDoModel from "./model";

export default class ToDoCollection {
    constructor(url) {
        this.url = url;
        this.list = [];

        this.setData = this.setData.bind(this);

        this.fetch = this.fetch.bind(this);

        this.model = new ToDoModel();
    }

    fetch() {
        return fetch(this.url)
        .then(response => response.json())
          .then(this.setData)
    }

    setData(list) {
        return this.list = list.map(el => new ToDoModel(this.url, el));
    }

    get(id) {
        return this.list.find(el => el.id == id);
    }

    //Удаляем строку на сервере
    deleteLineOnServer(id) {
        this.model.delete(this.url + '/' + id).then(this.display);
    }
}