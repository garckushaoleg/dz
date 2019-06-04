import ToDoCollection from './collection';
import config from './config';
import TodoView from './view';

export default class ToDoController{
    constructor(){

        this.collection = new ToDoCollection(config.contactsUrl);
        this.view = new TodoView('#contactList');
        
        this.displayContacts();
        this.displayContacts = this.displayContacts.bind(this);

        this.view.onClickOnButton = (id) => this.collection.deleteLineOnServer(id)
        .then(this.displayContacts);

        this.view.onClickOnLine = (id) => 
        this.collection.rewriteLineOnServer(id, this.getTask(id))
        .then(this.displayContacts);

        this.view.onClickButtonAdd = (data) => this.collection.addContactOnServer(data)
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