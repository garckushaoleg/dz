import ToDoCollection from '../model/collection';
import config from '../config';
import TodoView from '../view/view';
import Table from '../view/table';
import Line from '../view/line';
import Delete from '../view/delete';
import Add from '../view/add';

export default class ToDoController{
    constructor(){
        this.table = new Table();

        this.collection = new ToDoCollection(config.contactsUrl);
        this.line = new Line('#contactList');
        this.delete = new Delete('#contactList');
        this.add = new Add('#contactList');
        this.view = new TodoView('#contactList');
        
        this.displayContacts();
        this.displayContacts = this.displayContacts.bind(this);

        this.delete.onClickOnButton = (id) => this.collection.deleteLineOnServer(id)
        .then(this.displayContacts);

        this.line.onClickOnLine = (id) => 
        this.collection.rewriteLineOnServer(id, this.getTask(id))
        .then(this.displayContacts);

        this.add.onClickButtonAdd = (data) => this.collection.addContactOnServer(data)
        .then(this.displayContacts);
    }

    //Отображаем список контактов
    displayContacts() {
        this.collection.fetch().then((data) => {
            this.data = data; 
            this.view.render(data)
        })
        .then(this.view.resetContactForm);
    }

    //Получить задачу
    getTask(id) {
        let item = this.data.find(el => el.id == id);
        item.isDone = !item.isDone;
        return item
    }
}