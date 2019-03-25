//Добавляю лишку
function addLi() {
    let li = document.createElement('li');
    li.innerText = 'Молодец!';
    li.setAttribute('style', 'padding: 20px');
    ul.appendChild(li);
}

//Добавляю и меняю бэкграунд
function addBackground(event) {
    if (event.target.style.backgroundColor === 'yellow'){
        event.target.style.backgroundColor = 'red';
    } else event.target.style.backgroundColor = 'yellow';
}

//Скрываю лишку
function deleteLi(event) {
    if (event.altKey) ul.removeChild(event.target);
}

let ul = document.getElementsByTagName('ul')[0];

let p = document.querySelector('p');


p.addEventListener('click', addLi);

ul.addEventListener('click', addBackground);
ul.addEventListener('click', deleteLi);