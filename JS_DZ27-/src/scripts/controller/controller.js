import ToDoCollection from '../model/collection';
import config from '../config';
import View from '../view/view';
import Footer from '../view/footer';

export default class ToDoController{
    constructor(){

        this.collection = new ToDoCollection(config.contactsUrl);
        this.view = new View('#contactList');
        this.footer = new Footer();
        
        this.displayContacts();
        this.displayContacts = this.displayContacts.bind(this);

        this.view.onClickOnButton = (id) => this.collection.deleteLineOnServer(id)
        .then(this.displayContacts);

        this.view.onClickOnLine = (id) => 
        this.collection.rewriteLineOnServer(id, this.changeValueToOpposite(id))
        .then(this.displayContacts);

        this.footer.onClickButtonAdd = (data) => this.collection.addContactOnServer(data)
        .then(this.displayContacts).then(this.view.resetContactForm);
    }

    //Отображаем список контактов
    displayContacts() {
        this.collection.fetch().then((data) => {
            this.data = data; 
            this.view.render(data)
        });
    }

    //Изменяем значение isDone на противоположное
    changeValueToOpposite(id) {
        let item = this.data.find(el => el.id == id);
        item.isDone = !item.isDone;
        return item
    }
}