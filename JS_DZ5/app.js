//Задание массива
const ARRACTION = ["+", "-", "/", "*"];

//Проверка операнда
function checkOperand(number) {
    if (isNaN(+number) || number === '') {
        number = prompt ('Введите числовой операнд!', '');
        return checkOperand(number);
    } else { console.log(number); return +number; }
}

//Проверка знака
function checkAction(action) {

    for (let i=0; i<ARRACTION.length; i++) {

    if (action == ARRACTION[i]) {
        return i;
    } 

}

    action = prompt ('Введите правильный знак действия: или +, или - , или /, или *', '');
    return checkAction(action);
}

//Вычисления
function result (oneValue, twoValue, threeValue) {
    switch (twoValue) {
        case 0: return oneValue + threeValue;
        case 1: return oneValue - threeValue;
        case 2: return oneValue / threeValue;
        case 3: return oneValue * threeValue;
    }
}

//Модальные окна
let value = prompt ('Введите первый операнд', '');
let valueOne = checkOperand(value);
console.log(valueOne);

value = prompt ('Введите знак действия ( + - / * )', '');
let valueTwo = checkAction(value);
console.log(valueTwo);

value = prompt ('Введите второй операнд', '');
let valueThree = checkOperand(value);
console.log(valueThree);

//Вывод результата
alert ('Результат = ' + result(valueOne, valueTwo, valueThree));