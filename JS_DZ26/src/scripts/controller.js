import ToDoCollection from './collection';
import config from './config';
import TodoView from './view';

export default class ToDoController{
    constructor(){

        this.collection = new ToDoCollection(config.contactsUrl);
        this.view = new TodoView('#contact-list');
        
        this.displayContacts();
        this.displayContacts = this.displayContacts.bind(this);

        this.view.onClick = (id) => this.collection.deleteLineOnServer(id)
        .then(this.displayContacts);
    }

    //Отображаем список контактов
    displayContacts() {
        this.collection.fetch().then((data) => this.view.render(data));
    }
}