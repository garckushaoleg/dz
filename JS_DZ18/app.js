class Users{
    constructor(element) {
        this.element = element;
        this.toggle = false;

        this.init();
    }

    init() {
        this.getAnswer('get', URL_USERS, (responseText) => this.sortUserData(responseText), true);
        this.element.addEventListener('click', this.onReceiveUserPosts.bind(this));
    }

    //Получение ответа на запрос
    getAnswer(method, URL, callback, async) {
        let getAnswerToRequest = request();
        getAnswerToRequest(method, URL, callback, async);
    }

    //Сортирую данные о юзерах по соответствующим столбцам
    sortUserData(responseText) {
        let userTemplate = document.getElementById('userTemplate').innerHTML;

        responseText.forEach((item) => {

            this.element.children[1].innerHTML = this.element.children[1].innerHTML + userTemplate
                                       .replace('{{id}}', item.id)
                                       .replace('{{name}}', item.name)
                                       .replace('{{phone}}', item.phone)
                                       .replace('{{email}}', item.email);
        });
    }

    //Меняю бэкграунд строки
    toggleBackground(e) {
        let elements = Array.prototype.slice.call(this.element.children[1].children);

        elements.forEach((item) => {
            if (e.target.parentElement == item) {
                item.style.backgroundColor = 'red';
                return;
            }
            item.style.backgroundColor = 'black';
        })
    }

    //Создание таблицы для постов юзера
    createTable() {
        this.table = document.createElement('table');
        let thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');
        let tr = document.createElement('tr');
        let thOne = document.createElement('th');
        let thTwo = document.createElement('th');
        thOne.textContent = 'Title';
        thTwo.textContent = 'Body';
        document.body.appendChild(this.table);
        this.table.appendChild(thead);
        this.table.appendChild(this.tbody);
        thead.appendChild(tr);
        tr.appendChild(thOne);
        tr.appendChild(thTwo);
    }

    //Обработчик на получение постов юзера
    onReceiveUserPosts(e) {
        this.id = e.target.parentElement.dataset.userId;

        this.toggleBackground(e);

        this.getAnswer('get', URL_POSTS + this.id, (responseText) => this.sortDataUserPosts(responseText), true);

        if (this.toggle) this.table.remove();

        this.createTable();
    }
    
    //Сортировка постов юзера по соответствующим столбцам
    sortDataUserPosts(responseText) {
        let postTemplate = document.getElementById('postTemplate').innerHTML;

        responseText.forEach((item) => {
            this.toggle = true;

            this.tbody.innerHTML = this.tbody.innerHTML + postTemplate
                                       .replace('{{title}}', item.title)
                                       .replace('{{body}}', item.body);
        })
    }
}

const URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const URL_POSTS = 'https://jsonplaceholder.typicode.com/posts?userId='


var request = function() {
    var xhr = new XMLHttpRequest();
    return function( method, url, callback, async) {
        xhr.open( method, url, async);
        xhr.send();
        xhr.onload = function() {
            callback(JSON.parse(xhr.responseText));
        };
        
    };
};

const usersList = new Users( document.getElementById('usersListTable') );

