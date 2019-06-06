import TodoListModel from "./model";

export default class TodoListCollection {
    constructor(url) {
        this.url = url;
        this.list = [];

        this.setData = this.setData.bind(this);

        this.fetch = this.fetch.bind(this);
    }

    fetch() {
        return fetch(this.url)
            .then(response => response.json())
            .then(this.setData)
    }

    setData(list) {
        return this.list = list.map(el => new TodoListModel(this.url, el));
    }

    //Удаляем строку на сервере
    deleteLineOnServer(id) {
        let model = new TodoListModel(this.url, this.getArrayElement(id));
	    return model.delete();
    }

    //Получить элемент массива
    getArrayElement(id) {
        return this.list.find(el => el.id == id);
    }

    //Перезаписываем строку на сервере
    rewriteLineOnServer(id) {
        let model = new TodoListModel(this.url, this.getArrayElement(id));
        return model.rewrite();
    }

    //Добавляем тудушку на сервер
    addTodoOnServer(todo) {
        let model = new TodoListModel(this.url, todo);
        return model.write();
    }
}