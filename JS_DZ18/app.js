class Users{
    constructor(element) {
        this.element = element;
        this.toggle = false;

        this.init();
    }

    init() {
        request('get', URL + PATH_USERS, (responseObject) => this.displayUserData(responseObject), true);
        this.element.addEventListener('click', this.onClickOnUserString.bind(this));
    }

    //Отображаю данные о юзерах
    displayUserData(responseObject) {
        let totalInternalHTML = '';
        let userTemplate = document.getElementById('userTemplate').innerHTML;

        responseObject.forEach((item) => {

            totalInternalHTML = totalInternalHTML + userTemplate
                                       .replace('{{id}}', item.id)
                                       .replace('{{name}}', item.name)
                                       .replace('{{phone}}', item.phone)
                                       .replace('{{email}}', item.email);
        });

        this.element.children[1].innerHTML = totalInternalHTML;
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
        this.table.innerHTML = document.getElementById('tableTemplate').innerHTML;
        document.body.appendChild(this.table);
    }

    //Обработчик на получение постов юзера
    onClickOnUserString(e) {
        this.id = e.target.parentElement.dataset.userId;

        this.toggleBackground(e);

        request('get', URL + PATH_POSTS + this.id, (responseObject) => this.displayUserPosts(responseObject), true);

        if (this.toggle) this.table.remove();

        this.createTable();
    }
    
    //Отображаю посты юзера
    displayUserPosts(responseObject) {
        let totalInternalHTML = '';

        let postTemplate = document.getElementById('postTemplate').innerHTML;

        responseObject.forEach((item) => {
            this.toggle = true;

            totalInternalHTML = totalInternalHTML + postTemplate
                                       .replace('{{title}}', item.title)
                                       .replace('{{body}}', item.body);
        });

        this.table.children[1].innerHTML = totalInternalHTML;
    }
}

const URL = 'https://jsonplaceholder.typicode.com/';
const PATH_USERS = 'users';
const PATH_POSTS = 'posts?userId=';


var request = function() {
    var xhr = new XMLHttpRequest();
    return function( method, url, callback, async) {
        xhr.onload = function() {
            callback(JSON.parse(xhr.responseText));
        };
        xhr.open( method, url, async);
        xhr.send();
    };
}();

const usersList = new Users( document.getElementById('usersListTable') );

