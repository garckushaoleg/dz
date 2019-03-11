//Задание массива
const ARRACTION = ["+", "-", "/", "*"];
const ARRWINDOWS = ["Введите первый операнд",
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

let operandAction = [];
let j = 0;

while (j < ARRWINDOWS.length) {
    let value = prompt(ARRWINDOWS[j], '');

    if (j == 0 || j == 2) {
        operandAction[j] = checkOperand(value);
    } else 
    operandAction[j] = checkAction(value);

    j++;
}

//Вывод результата
alert('Результат = ' + result(operandAction[0], operandAction[1], operandAction[2]));