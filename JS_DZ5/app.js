//Задание массива
const ARRACTION = ["+", "-", "/", "*"];
const ARRMODALWINDOWS = ["Введите первый операнд",
    "Введите знак действия ( + - / * )",
    "Введите второй операнд"];

//Проверка операнда
function checkOperand(numberCalc) {
    if (!Number(numberCalc)) {
        numberCalc = prompt('Введите числовой операнд!', '');
        return checkOperand(numberCalc);
    } else
        return +numberCalc;
}

//Проверка знака
function checkAction(action) {
    
    for (let i = 0; i < ARRACTION.length; i++) {
        if (action == ARRACTION[i]) {
            return ARRACTION[i];
        }
    }

    action = prompt('Введите правильный знак действия: или +, или - , или /, или *', '');
    return checkAction(action);
}

//Вычисления
function result(oneOperand, actionFunc, twoOperand) {
    switch (actionFunc) {
        case '+': return oneOperand + twoOperand;
        case '-': return oneOperand - twoOperand;
        case '/': return oneOperand / twoOperand;
        case '*': return oneOperand * twoOperand;
    }
}

//Переменные для цикла
let operandOne;
let action;
let operandTwo;
//Вывод модальных окон при помощи цикла и массива строковых значений
for (let j = 0; j < ARRMODALWINDOWS.length; j++) {
    let value = prompt(ARRMODALWINDOWS[j], '');

    switch (j) {
        case 0: operandOne = checkOperand(value); break;
        case 1: action = checkAction(value); break;
        case 2: operandTwo = checkOperand(value); break;
    }
}

//Вывод результата
alert('Результат = ' + result(operandOne, action, operandTwo));