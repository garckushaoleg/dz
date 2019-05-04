class Users {

  constructor(element) {
    this.element = element;

    this.init();
  }

  init() {
    this.tbody = this.element.getElementsByTagName('tbody')[0];
    this.getDataAboutUsers();
    this.element.addEventListener('click', this.onUserRowClick.bind(this));
  }

  //Получить данные о юзерах
  getDataAboutUsers() {
    request('get', URL + PATH_USERS).then(response => this.displayUserData(response));
  }

  //Отображаю данные о юзерах
  displayUserData(responseObject) {
    let userTemplate = document.getElementById('userTemplate').innerHTML;

    const totalInternalHTML = responseObject.map((item) => {

      return userTemplate
        .replace('{{id}}', item.id)
        .replace('{{name}}', item.name)
        .replace('{{phone}}', item.phone)
        .replace('{{email}}', item.email);

    });

    this.tbody.innerHTML = totalInternalHTML.join('\n');
  }

  //Меняю бэкграунд строки
  toggleBackground(e) {
    let elements = Array.prototype.slice.call(this.tbody.children);

    elements.forEach((item) => {
      if (e.target.parentElement == item) {
        item.style.backgroundColor = 'red';
      } else {
        item.style.backgroundColor = 'black';
      }
    })
  }

  //Обработчик на получение постов и альбомов юзера
  onUserRowClick(e) {
    this.id = e.target.parentElement.dataset.userId;

    this.toggleBackground(e);

    request('get', URL + PATH_POSTS + this.id)
      .then(response => {
        this.displayUserPosts(response);
        return request('get', URL + PATH_ALBUMS + this.id)
      })
      .then(response => this.displayUserAlbums(response));
  }

  //Получить весь внутренний HTML
  getWholeInternalHTML(responseObject) {
    const totalInternalHTML = responseObject.map((item) => {
      return `<li>${item.title}</li>`;
    });

    return totalInternalHTML.join('\n')
  }

  //Отображаю посты юзера
  displayUserPosts(responseObject) {
    this.userPosts = document.getElementById('userPosts');

    this.userPosts.innerHTML = this.getWholeInternalHTML(responseObject);
  }

  //Отображаю названия альбомов юзера
  displayUserAlbums(responseObject) {
    this.userAlbums = document.getElementById('userAlbums');

    this.userAlbums.innerHTML = this.getWholeInternalHTML(responseObject);
  }
}

const URL = 'https://jsonplaceholder.typicode.com/';
const PATH_USERS = 'users';
const PATH_POSTS = 'posts?userId=';
const PATH_ALBUMS = 'albums?userId=';


function request(method, url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

const usersList = new Users(document.getElementById('usersListTable'));

