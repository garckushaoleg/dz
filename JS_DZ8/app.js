//Возвращает имя юзера
function getUserName() {
    let userAnswer = prompt('Введите Ваше имя пожалуйста', ''); 
    if (userAnswer === null || userAnswer.trim() === '' || !isNaN(Number(userAnswer))) {
        return getUserName();
    } else {
        return userAnswer;
    }
}


//Возвращает число
function getNumber() {
    let answerUser = prompt('Введите число от 0 до 100', ''); 
    if (!isNaN(Number(answerUser)) && answerUser >= 0 && answerUser <= 100 
        && answerUser !== null && answerUser.trim() !== '') {
        return answerUser;
    } else {
        return getNumber();
    }
}

//Добавление в тег h1 приветствия с именем юзера
let h1 = document.body.getElementsByTagName('h1') [0];
h1.innerText = 'Привет ' + getUserName() + '!';

// Создание и добавление тега ul
let ul = document.createElement('ul');
document.body.appendChild(ul);
//Ввод и проверка числа
let answerTrue = getNumber();
//Теги li с числами из массива
for(let i = 0; i <= answerTrue; i++) {
    ul.innerHTML = ul.innerHTML + '<li>' + i + '</li>';
}


