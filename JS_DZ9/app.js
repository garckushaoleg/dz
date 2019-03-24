let value; //Глобальная переменная для нажатой и отжатой клавиши

//Добавляю лишку
function addLi() {
    let li = document.createElement('li');
    li.innerText = 'Молодец!';
    li.setAttribute('style', 'padding: 20px');
    ul.appendChild(li);
}

//Добавляю и меняю бэкграунд
function addBackground() {
    if (event.target.style.backgroundColor === 'yellow'){
        event.target.style.backgroundColor = 'red';
    } else event.target.style.backgroundColor = 'yellow';
}

//Скрываю лишку
function hideLi() {
    if (value === true) event.target.hidden = true;
    console.log(event.target);
}

//Получить правду для нажатой клавиши
function getTrue() {
    if (event.keyCode == 18) value = true;
}

//Получить ложь для отжатой клавиши
function getFalse() {
    if (event.keyCode == 18) value = false;
}


let ul = document.getElementsByTagName('ul')[0];

let p = document.querySelector('p');


p.addEventListener('click', addLi);

ul.addEventListener('click', addBackground);
ul.addEventListener('click', hideLi);

window.addEventListener('keydown', getTrue);
window.addEventListener('keyup', getFalse);