import ToDoCollection from './collection';
import config from './config';
import TodoView from './view';

export default class ToDoController{
    constructor(){

        this.collection = new ToDoCollection(config.contactsUrl);
        this.view = new TodoView('#contact-list');
        
        this.displayContacts();
        this.collection.display = () => this.displayContacts();

        this.view.onClick = (id) => this.collection.deleteLineOnServer(id);
    }

    //Отображаем список контактов
    displayContacts() {
        this.collection.fetch().then((data) => this.view.render(data));
    }
}