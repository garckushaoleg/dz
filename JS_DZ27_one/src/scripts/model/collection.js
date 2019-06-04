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

    //Удаляем строку на сервере
    deleteLineOnServer(id) {
        let model = new ToDoModel(this.url, this.getArrayElement(id));
        return model.delete();
    }

    //Получить элемент массива
    getArrayElement(id) {
        return this.list.find(el => el.id == id);
    }

    //Перезаписываем строку на сервере
    rewriteLineOnServer(id) {
        let model = new ToDoModel(this.url, this.getArrayElement(id));
        return model.rewrite();
    }

    //Добавляем контакт на сервер
    addContactOnServer(contact) {
        let model = new ToDoModel(this.url, contact);
        return model.write();
    }
}