let arrNumbers = [];

//Контроль ввода имени
function toControl(userAnswer) {
    if (userAnswer === null || Number(userAnswer) == 0) {
        userAnswer = prompt('Введите Ваше имя пожалуйста', ''); 
        return toControl(userAnswer);
    } else {
        return userAnswer;
    }
}


//Валидация
function validate(answerUser) {
    if (!!Number(answerUser) && answerUser <= 100) {
        return answerUser;
    } else {
        answerUser = prompt('Введите ещё раз', ''); 
        return validate(answerUser);
    }
}

//Добавление в тег h1 приветствия с именем юзера
let answer = prompt('Как тебя зовут?', '');
let h1 = document.body.getElementsByTagName('h1') [0];
h1.innerText = 'Привет ' + toControl(answer) + '!';

//Ввод и проверка числа
answer = prompt('Введите число от 0 до 100', '');
let answerTrue = validate(answer);
//Формирование массива чисел от 1 до answerTrue
for(let i=0; i<answerTrue; i++) {
    arrNumbers.push(i+1);
}
// Создание и добавление тега ul
let ul = document.createElement('ul');
document.body.appendChild(ul);
// Теги li с числами из массива
arrNumbers.forEach(function(item) {
        ul.innerHTML = ul.innerHTML + '<li>' + item + '</li>';
    })


