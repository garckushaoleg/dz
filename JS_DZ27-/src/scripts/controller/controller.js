import TodoListCollection from '../model/collection';
import config from '../config';
import TodoListView from '../view/view';
import TodoListFooter from '../view/footer';

export default class TodoListController{
    constructor(){

        this.collection = new TodoListCollection(config.todosUrl);
        this.view = new TodoListView();
        this.footer = new TodoListFooter();
        
        this.displayTodoList();
        this.displayTodoList = this.displayTodoList.bind(this);

        this.view.onClickOnButton = (id) => this.collection.deleteLineOnServer(id)
        .then(this.displayTodoList);

        this.view.onClickOnLine = (id) => 
        this.collection.rewriteLineOnServer(id, this.toggle(id))
        .then(this.displayTodoList);

        this.footer.onClickButtonAdd = (data) => this.collection.addTodoOnServer(data)
        .then(this.displayTodoList).then(this.view.resetTodoList);
    }

    //Отображаем список тудушек
    displayTodoList() {
        this.collection.fetch().then((data) => {
            this.view.render(data)
        });
    }

    //Изменяем значение isDone на противоположное
    toggle(id) {
        let item = this.collection.getArrayElement(id);
        item.isDone = !item.isDone;
        return item
    }
}