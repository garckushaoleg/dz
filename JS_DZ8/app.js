//Проверка имени юзера
function getUserName(userAnswer) {
    if (userAnswer === null || userAnswer.trim() === '' || !isNaN(Number(userAnswer))) {
        return false;
    } else {
        return true;
    }
}


//Валидация числа
function getNumber(answerUser) {
    if (!isNaN(Number(answerUser)) && answerUser >= 0 && answerUser <= 100 
        && answerUser !== null && answerUser.trim() !== '') {
        return true;
    } else {
        return false;
    }
}

let answer;

do {
    answer = prompt('Введите Ваше имя пожалуйста', '');
} while (!getUserName(answer));
//Добавление в тег h1 приветствия с именем юзера
let h1 = document.body.getElementsByTagName('h1') [0];
h1.innerText = 'Привет ' + answer + '!';

do {
    answer = prompt('Введите число от 0 до 100', ''); 
} while (!getNumber(answer));
// Создание и добавление тега ul
let ul = document.createElement('ul');
document.body.appendChild(ul);
//Теги li с числами из массива
for(let i = 0; i <= answer; i++) {
    ul.innerHTML = ul.innerHTML + '<li>' + i + '</li>';
}


